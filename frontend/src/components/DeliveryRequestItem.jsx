import PropTypes from "prop-types";
import { approveDeliveryRequest } from "../utils/apiCalls";

export const DeliveryRequestItem = ({ orderId, customerName, customerEmail, amount, fetchDeliveryRequests }) => {
  const handleClick = async () => {
    await approveDeliveryRequest(orderId);
    await fetchDeliveryRequests();
  };

  return (
    <div className="flex-column flex-column-small">
      <div className="flex-justify-between">
        <p className="date">
          Order ID: <span className="date">{orderId}</span>
        </p>
        <button onClick={handleClick} className="btn-outlined">
          Approve
        </button>
      </div>
      <p>
        Customer Name: <span>{customerName}</span>
      </p>
      <p>
        Customer Email: <span>{customerEmail}</span>
      </p>
      <p>
        Amount: <span className="money">{amount}</span>
      </p>
    </div>
  );
};

DeliveryRequestItem.propTypes = {
  orderId: PropTypes.string.isRequired,
  customerName: PropTypes.string,
  customerEmail: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  fetchDeliveryRequests: PropTypes.func.isRequired,
};
