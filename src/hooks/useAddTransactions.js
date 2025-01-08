import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase-config";

function useAddTransaction() {
    const transactionCollectionRef = collection(db, "transactions");

    const useTransaction = async({description, transactionAmount, transactionType}) => {
        await addDoc(transactionCollectionRef, {
            userID: "",
            description,
            transactionAmount,
            transactionType,
            createdAt: serverTimestamp(),
        });
    };

    return { useTransaction };
}

export default useAddTransaction;