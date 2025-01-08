import { formattedDate } from "../utils/formattedDate";
import PropTypes from "prop-types";

export const TransactionHistoryItem = ({ _id: id, orderId, from, to, amount, at }) => {
  return (
    <div className="w-full flex-column gap-vertical-small border border-large padding">
      <p className="text-bold">
        Transaction ID: <span>{id}</span>
      </p>
      <p className="text-bold">
        Order ID: <span>{orderId}</span>
      </p>
      <p className="text-bold">
        From: <span>{from}</span>
      </p>
      <p className="text-bold">
        To: <span>{to}</span>
      </p>
      <p className="text-bold">
        Amount: <span className="price">&#x09F3;{amount}</span>
      </p>
      <p className="date">
        At: <span className="date">{formattedDate(at)}</span>
      </p>
    </div>
  );
};

TransactionHistoryItem.propTypes = {
  _id: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  at: PropTypes.string.isRequired,
};
