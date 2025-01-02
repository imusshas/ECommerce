import PropTypes from "prop-types";
import { approveSupplyRequest } from "../utils/apiCalls";

export const SupplyRequestItem = ({ orderId, customerName, customerEmail, amount, fetchSupplyRequest }) => {
  const handleClick = async () => {
    try {
      await approveSupplyRequest(orderId);
      await fetchSupplyRequest();
    } catch (error) {
      console.log("Error while approving order request:", error);
    }
  };

  return (
    <div className="flex-column flex-column-small">
      <p className="date">
        Order ID: <span className="date">{orderId}</span>
      </p>
      <p>
        Customer Name: <span>{customerName}</span>
      </p>
      <p>
        Customer Email: <span>{customerEmail}</span>
      </p>
      <p>
        Amount: <span className="money">{amount}</span>
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
};
