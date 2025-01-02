import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { formattedDate } from "../utils/formattedDate";
import { getCart } from "../reducers/orderSlice";

import "../styles/Payment.css";

export const Success = () => {
  const { transaction } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const { _id: id, orderId, amount, at } = transaction;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCart());
    navigate("/", { replace: true });
  };

  return (
    <div className="form-wrapper success">
      <form onSubmit={handleSubmit} className="bg">
        <h1 className="form-title">Payment Successful</h1>
        <div className="payment-info">
          <p>
            Transaction ID: <span>{id}</span>
          </p>
          <p>
            Order ID: <span>{orderId}</span>
          </p>
          <p>
            Amount: <span>&#x09F3;{amount}</span>
          </p>
          <p>
            Payment Method: <span>Admin Bank</span>
          </p>
          <p className="payment-date">
            At: <span>{formattedDate(at)}</span>
          </p>
        </div>
        <button type="submit">Continue Shopping</button>
      </form>
    </div>
  );
};
