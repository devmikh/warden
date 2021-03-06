import React, { useState } from "react";
import FormTransactionListItem from "./FormTransactionListItem";
import AddTransactionForm from "./AddTransactionForm";

export default function FormTransactionList(props) {
  // const [transactionList, setTransactionList] = useState(
  // (props.currentItem && props.currentItem.transactions) || []
  // );
  // const formTransactionListItems = props.currentItem
  //   ? props.currentItem.transactions.map((transaction) => {
  //       return <FormTransactionListItem transaction={transaction} />;
  //     })
  //   : [];

  const { transactions, setTransactions, fetchItemDetails } = props;

  function compareDateNewest(a, b) {
    if (parseInt(a.date, 10) > parseInt(b.date, 10)) return -1;
    if (parseInt(b.date, 10) > parseInt(a.date, 10)) return 1;

    return 0;
  }

  function onDelete(name, amount) {
    // console.log("before splice", transactionList);
    // // const list = transactionList.splice(index, 1);
    // console.log("after splice", transactionList);
    // // console.log("indelete", list);

    setTransactions(
      transactions.filter((transaction) => {
        return transaction.name !== name || transaction.amount !== amount;
      })
    );
  }

  const formTransactionListItems = transactions
    .sort(compareDateNewest)
    .map((transaction, index) => {
      return (
        <FormTransactionListItem
          key={index}
          transaction={transaction}
          onDelete={setTransactions && onDelete}
          fetchItemDetails={fetchItemDetails || false}
        />
      );
    });

  return (
    <table className="list">
      <thead>
        <tr>
          <th className="date">Date</th>
          <th className="name">Name</th>
          <th className="amount">Amount</th>
          {setTransactions && <th>Action</th>}
        </tr>
      </thead>
      <tbody>
        {setTransactions && (
          <AddTransactionForm
            transactions={transactions}
            setTransactions={setTransactions}
            setError={props.setError}
          />
        )}
        {transactions.length > 0 && formTransactionListItems}
      </tbody>
    </table>
  );
}
