import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../configs/firebase-config";

function useAddTransaction() {
    const transactionCollectionRef = collection(db, "transactions");
    
    const useTransaction = async() => {
        await addDoc(transactionCollectionRef, {
            userID: "",
            description: "",
            transactionAmount: 0,
            transactionType: "",
            createdAt: serverTimestamp(),
        });
    };

    return { useTransaction };
}

export default useAddTransaction;