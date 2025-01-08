import { useState, useEffect } from "react";
import { db } from "../configs/firebase-config";
import { query, collection, onSnapshot, where, orderBy } from "firebase/firestore";
import useGetUserInfo from "./useGetUserInfo";

function useGetTransaction() {
  const [transactions, setTransactions] = useState([]);
  const transactionCollectionRef = collection(db, "transactions");
  const { userID } = useGetUserInfo();

  // displays all transactions
  const getTransactions = async () => {
    let unsubscribe;
    
    try {
      const queryTransactions = query(
        transactionCollectionRef,
        where("userID", "==", userID),
        orderBy("createdAt")
      );

      unsubscribe = onSnapshot(queryTransactions, (snapshot) => {
        let docs = [];

        snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            docs.push({...data, id});
        });

        setTransactions(docs);
      });
    } catch (err) {
      console.error(err);
    }

    return () => unsubscribe();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return { transactions };
}

export default useGetTransaction;
