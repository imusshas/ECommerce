import { useEffect, useState } from "react";
import { getTransactionHistory } from "../utils/apiCalls";
import { TransactionHistoryItem } from "../components/TransactionHistoryItem";
import { EmptyTransactionHistory } from "../components/EmptyTransactionHistory";

export const TransactionHistoryPage = () => {
  const [transactionHistory, setTransactionHistory] = useState([]);

  useEffect(() => {
    async function fetchTransactionHistory() {
      const transactionHistory = await getTransactionHistory();
      transactionHistory.sort((a, b) => {
        const millisecondsA = new Date(a.createdAt).getTime();
        const millisecondsB = new Date(b.createdAt).getTime();
        return millisecondsB - millisecondsA;
      });
      setTransactionHistory(transactionHistory);
    }

    fetchTransactionHistory();
  }, []);

  if (transactionHistory.length === 0) {
    return <EmptyTransactionHistory />;
  }

  return (
    <div>
      {transactionHistory.map((transaction) => (
        <TransactionHistoryItem key={transaction._id} {...transaction} />
      ))}
    </div>
  );
};
