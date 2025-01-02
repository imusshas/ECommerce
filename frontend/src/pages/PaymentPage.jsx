import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../reducers/orderSlice";

import "../styles/Payment.css";
import { Navigate } from "react-router-dom";

export const PaymentPage = () => {
  const { cart, transaction, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [accountSecret, setAccountSecret] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const input = {
    type: "password",
    name: "accountSecret",
    field: "Account Secret",
    placeholder: "Enter Account Secret",
    value: accountSecret,
    error: submittedOnce
      ? accountSecret
        ? error?.message === "Invalid credentials"
          ? "Invalid Account Secret"
          : accountSecret.length < 6
          ? "Account secret must contain at least 6 characters"
          : ""
        : "Account secret is required"
      : "",
  };

  const handleInputChange = (e) => {
    setAccountSecret(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    if (!accountSecret) {
      return;
    }
    dispatch(makePayment({ orderId: cart._id, accountSecret }));
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error && error?.message !== "Invalid credentials") {
    return <Navigate to="/payment/failure" replace />;
  }

  if (transaction?._id) {
    return <Navigate to="/payment/success" replace />;
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Make Payment</h1>
        <div className="payment-info">
          <p>
            Payable Total: <span className="total-price payment-price">&nbsp;&#x09F3;{cart.amount}</span>
          </p>
          <p>
            Payment Method: <span>&nbsp;Admin Bank</span>
          </p>
          <p>Please enter your account secret to confirm payment</p>
        </div>
        <div key={input.name} className="input-group">
          <label htmlFor={input.name} className="input-label">
            {input.field}
          </label>
          <div>
            <input
              type={input.type}
              name={input.name}
              id={input.name}
              placeholder={input.placeholder}
              autoComplete="off"
              value={input.value}
              onChange={handleInputChange}
              className={input.error ? "error" : ""}
            />
            <p className="error">{input.error}</p>
          </div>
        </div>
        <button type="submit" disabled={input.error && input.error !== "Invalid Account Secret"}>
          Confirm
        </button>
      </form>
    </div>
  );
};
