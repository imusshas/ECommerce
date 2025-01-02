import { useEffect, useState } from "react";
import { getTransactionRequests } from "../utils/apiCalls";
import { TransactionRequestItem } from "../components/TransactionRequestItem";
import { EmptyTransactionRequest } from "../components/EmptyTransactionRequest";

export const HomePageBank = () => {
  const [transactionRequests, setTransactionRequests] = useState([]);

  const fetchTransactionRequests = async () => {
    const transactionRequests = await getTransactionRequests();

    setTransactionRequests(transactionRequests);
  };

  useEffect(() => {
    fetchTransactionRequests();
  }, []);

  if (transactionRequests.length === 0) {
    return <EmptyTransactionRequest />;
  }

  return (
    <div className="grid">
      {transactionRequests.map((transactionRequest) => (
        <TransactionRequestItem
          key={transactionRequest._id}
          {...transactionRequest}
          fetchTransactionRequests={fetchTransactionRequests}
        />
      ))}
    </div>
  );
};
