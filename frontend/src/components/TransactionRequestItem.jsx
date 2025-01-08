import PropTypes from "prop-types";
import { approveTransactionRequest } from "../utils/apiCalls";

export const TransactionRequestItem = ({ _id: id, orderId, from, to, amount, fetchTransactionRequests, setLoading }) => {
  const handleClick = async () => {
    try {
      setLoading(true);
      await approveTransactionRequest({transactionId: id});
      await fetchTransactionRequests();
    } catch (error) {
      console.log("Error while approving transaction request:", error);
    }
  };

  return (
    <div className="flex-column flex-column-small border border-large padding">
      <p className="date">
        Order ID: <span className="date">{orderId}</span>
      </p>
      <p className="text-bold">
        From: <span>{from}</span>
      </p>
      <p className="text-bold">
        To: <span>{to}</span>
      </p>
      <p className="text-bold">
        Amount: <span className="money">&#x09F3;{amount}</span>
      </p>
      <button onClick={handleClick} className="self-center">
        Approve
      </button>
    </div>
  );
};

TransactionRequestItem.propTypes = {
  _id: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  fetchTransactionRequests: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
