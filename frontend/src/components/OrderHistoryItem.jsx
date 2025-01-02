import PropTypes from "prop-types";
import { formattedDate } from "../utils/formattedDate";

export const OrderHistoryItem = ({ _id: id, createdAt, amount, status }) => {
  return (
    <div className="flex-column flex-column-small">
      <p>
        Order ID: <span>{id}</span>
      </p>
      <p className="date">
        Order Date: <span className="date">{formattedDate(createdAt)}</span>
      </p>
      <p>
        Order Amount: <span>&#x09F3;{amount}</span>
      </p>
      <p>
        Order Status: <span className={`${status.split(" ")[0].toLowerCase()}`}>{status.split(" ")[0]}</span>
      </p>
    </div>
  );
};

OrderHistoryItem.propTypes = {
  _id: PropTypes.string.isRequired,
  createdAt: PropTypes.string,
  amount: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
};
