import { formattedDate } from "../utils/formattedDate";
import PropTypes from 'prop-types';

export const TransactionHistoryItem = ({_id: id, orderId, from, to, amount, at}) => {
  return (
    <div className="flex-column flex-column-small">
      <p>
        Transaction ID: <span>{id}</span>
      </p>
      <p>
        Order ID: <span>{orderId}</span>
      </p>
      <p>
        From: <span>{from}</span>
      </p>
      <p>
        To: <span>{to}</span>
      </p>
      <p>
        Amount: <span>&#x09F3;{amount}</span>
      </p>
      <p className="date">
        At: <span className="date">{formattedDate(at)}</span>
      </p>
    </div>
  );
}

TransactionHistoryItem.propTypes = {
  _id: PropTypes.string.isRequired,
  orderId: PropTypes.string.isRequired,
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  at: PropTypes.string.isRequired,
};

