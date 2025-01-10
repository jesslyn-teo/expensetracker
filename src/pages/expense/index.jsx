import { useState } from "react";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../configs/firebase-config";
import useAddTransaction from "../../hooks/useAddTransactions";
import useGetTransaction from "../../hooks/useGetTransactions";
import useGetUserInfo from "../../hooks/useGetUserInfo";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();
  const { transactions, transactionTotal } = useGetTransaction();
  const { name, profilePhoto } = useGetUserInfo();
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const { balance,  income, expenses } = transactionTotal;

  const submitTransactionForm = (e) => {
    e.preventDefault();
    addTransaction({
      description,
      transactionAmount,
      transactionType,
    });

    setDescription("");
    setTransactionAmount("");
  };

  const userSignOut = async() => {
    try {
      await signOut(auth);
      localStorage.clear();
      navigate("/");
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <div className="expense tracker">
        <div className="container">
          <div className="header">
            {profilePhoto && (
              <div className="profile">
                <img className="profile-photo" src={profilePhoto} />
              </div>
            )}
            <h1>{name}'s Expense Tracker</h1>
            <button className="sign-out" onClick={userSignOut}>Sign Out</button>
          </div>
  
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>${balance}</h2>
          </div>
  
          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>${income}</p>
            </div>
  
            <div className="expense">
              <h4>Expense</h4>
              <p>${expenses}</p>
            </div>
          </div>
  
          <form className="add transaction" onSubmit={submitTransactionForm}>
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={transactionAmount}
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  id="expense"
                  value="expense"
                  checked={transactionType === "expense"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                Expenses
              </label>
              <label>
                <input
                  type="radio"
                  id="income"
                  value="income"
                  checked={transactionType === "income"}
                  onChange={(e) => setTransactionType(e.target.value)}
                />
                Income
              </label>
            </div>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } = transaction;
            return (
              <li>
                <h4>{description}</h4>
                <p>
                  {""}${transactionAmount} - <label>{transactionType}</label>
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ExpenseTracker;
