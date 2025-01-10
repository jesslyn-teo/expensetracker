import { useState } from "react";
import useAddTransaction from "../../hooks/useAddTransactions";
import useGetTransaction from "../../hooks/useGetTransactions";

function ExpenseTracker() {
  const { addTransaction } = useAddTransaction();
  const { transactions } = useGetTransaction();

  const [description, setDescription] = useState("");
  const [transactionAmount, setTransactionAmount] = useState(0);
  const [transactionType, setTransactionType] = useState("expense");

  const submitTransactionForm = (e) => {
    e.preventDefault();
    addTransaction({
      description: "Haircut",
      transactionAmount: 22,
      transactionType: "expense",
    });
  };

  return (
    <>
      <div className="expense tracker">
        <div className="container">
          <h1>Expense Tracker</h1>
          <div className="balance">
            <h3>Your Balance</h3>
            <h2>$0.00</h2>
          </div>

          <div className="summary">
            <div className="income">
              <h4>Income</h4>
              <p>$0.00</p>
            </div>

            <div className="expense">
              <h4>Expense</h4>
              <p>$0.00</p>
            </div>
          </div>

          <form className="add transaction" onSubmit={submitTransactionForm}>
            <input
              type="text"
              placeholder="Description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              onChange={(e) => setTransactionAmount(e.target.value)}
              required
            />
            <input
              type="radio"
              id="expense"
              value="expense"
              checked={transactionType === "expense"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label>Expenses</label>
            <input
              type="radio"
              id="income"
              value="income"
              checked={transactionType === "income"}
              onChange={(e) => setTransactionType(e.target.value)}
            />
            <label>Income</label>
            <button type="submit">Add Transaction</button>
          </form>
        </div>
      </div>
      <div className="transactions">
        <h3>Transactions</h3>
        <ul>
          {transactions.map((transaction) => {
            const { description, transactionAmount, transactionType } = transaction;
            return(
              <li>
                <h4>{description}</h4>
                <p>
                  {""}
                  ${transactionAmount} - <label>{transactionType}</label>
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </>
  );
}

export default ExpenseTracker;
