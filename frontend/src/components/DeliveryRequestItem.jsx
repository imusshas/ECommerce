import PropTypes from "prop-types";
import { approveDeliveryRequest } from "../utils/apiCalls";

export const DeliveryRequestItem = ({ orderId, customerName, customerEmail, amount, fetchDeliveryRequests, setLoading }) => {
  const handleClick = async () => {
    setLoading(true);
    await approveDeliveryRequest(orderId);
    await fetchDeliveryRequests();
  };

  return (
    <div className="w-full flex-column gap-vertical-small border border-large padding">
      <div className="flex-justify-between">
        <p className="date">
          Order ID: <span className="date">{orderId}</span>
        </p>
        <button onClick={handleClick} className="btn-outlined">
          Approve
        </button>
      </div>
      <p className="text-bold">
        Customer Name: <span>{customerName}</span>
      </p>
      <p className="text-bold">
        Customer Email: <span>{customerEmail}</span>
      </p>
      <p className="text-bold">
        Amount: <span className="money">&#x09F3;{amount}</span>
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
  setLoading: PropTypes.func.isRequired,
};
