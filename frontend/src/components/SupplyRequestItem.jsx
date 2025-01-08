import PropTypes from "prop-types";
import { approveSupplyRequest } from "../utils/apiCalls";

export const SupplyRequestItem = ({ orderId, customerName, customerEmail, amount, fetchSupplyRequest, setLoading }) => {
  const handleClick = async () => {
    try {
      setLoading(true);
      await approveSupplyRequest(orderId);
      await fetchSupplyRequest();
    } catch (error) {
      console.log("Error while approving order request:", error);
    }
  };

  return (
    <div className="flex-column gap-vertical-small border border-large padding">
      <p className="date">
        Order ID: <span className="date">{orderId}</span>
      </p>
      <p className="text-bold">
        Customer Name: <span>{customerName}</span>
      </p>
      <p className="text-bold">
        Customer Email: <span>{customerEmail}</span>
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

SupplyRequestItem.propTypes = {
  orderId: PropTypes.string.isRequired,
  customerName: PropTypes.string.isRequired,
  customerEmail: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  fetchSupplyRequest: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};
