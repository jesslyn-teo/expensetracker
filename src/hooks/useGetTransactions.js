import { useState, useEffect } from "react";
import { db } from "../configs/firebase-config";
import { query, collection, onSnapshot, where, orderBy } from "firebase/firestore";
import useGetUserInfo from "./useGetUserInfo";

function useGetTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [transactionTotal, setTransactionTotal] = useState({
    balance: 0.0,
    income: 0.0,
    expenses: 0.0
  });
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
        let totalIncome = 0;
        let totalExpenses = 0;

        snapshot.forEach((doc) => {
            const data = doc.data();
            const id = doc.id;

            docs.push({...data, id});

            if(data.transactionType === "expense") {
              totalExpenses += Number(data.transactionAmount);
            } else {
              totalIncome += Number(data.transactionAmount);
            }

            setTransactions(docs);

            let balance = totalIncome - totalExpenses;
            setTransactionTotal({
              balance,
              expenses: totalExpenses,
              income: totalIncome,
            })
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

  return { transactions, transactionTotal };
}

export default useGetTransaction;
