import { useState } from "react";
import { LoadingPage } from "./LoadingPage";
import { useDispatch, useSelector } from "react-redux";
import { makePayment } from "../reducers/orderSlice";
import { Navigate } from "react-router-dom";

export const PaymentPage = () => {
  const { cart, transaction, loading, error } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [formStates, setFormStates] = useState({
    accountSecret: "",
    accountSecretError: "",
  });

  const input = {
    type: "password",
    name: "accountSecret",
    field: "Account Secret",
    placeholder: "Enter Account Secret",
    value: formStates.accountSecret,
    error: submittedOnce ? formStates.accountSecretError : "",
  };

  const validateAccountSecret = (accountSecret) => {
    if (!accountSecret) return "Account secret is required";
    if (accountSecret.length < 6) return "Account secret must contain at least 6 characters";
    return "";
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormStates((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (submittedOnce) {
      setFormStates((prevState) => ({
        ...prevState,
        accountSecretError: validateAccountSecret(value),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // Validate the inputs before submitting
    const accountSecretError = validateAccountSecret(formStates.accountSecret);

    if (accountSecretError) {
      setFormStates((prevState) => ({
        ...prevState,
        accountSecretError,
      }));
      return;
    }

    dispatch(makePayment({ orderId: cart._id, accountSecret: formStates.accountSecret }));
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <Navigate to="/payment/failure" replace />;
  }

  if (transaction?._id) {
    return <Navigate to="/payment/success" replace />;
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Make Payment</h1>
        <p className="error">Please enter account secret to confirm payment</p>
        <div className="w-full flex-column gap-vertical-small">
          <p>
            Payable Total: <span className="text-large price">&nbsp;&#x09F3;{cart.amount}</span>
          </p>
          <p>
            Payment Method: <span>&nbsp;Admin Bank</span>
          </p>
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
