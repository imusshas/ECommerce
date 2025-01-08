import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { addMoney } from "../utils/apiCalls";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

export const AddMoneyPage = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const { accountName, accountNo, balance } = location.state || {};
  const navigate = useNavigate();

  const [formStates, setFormStates] = useState({
    amount: "",
    accountSecret: "",
    amountError: "",
    accountSecretError: "",
  });

  const [submittedOnce, setSubmittedOnce] = useState(false);

  const formInputs = [
    {
      type: "number",
      name: "amount",
      field: "Amount",
      placeholder: "Enter Amount",
      value: formStates.amount,
      error: submittedOnce ? formStates.amountError : "",
    },
    {
      type: "password",
      name: "accountSecret",
      field: "Account Secret",
      placeholder: "Enter Account Secret",
      value: formStates.accountSecret,
      error: submittedOnce ? formStates.accountSecretError : "",
    },
  ];

  const validateAmount = (amount) => {
    if (!amount) return "Amount is required";
    if (amount <= 0 || isNaN(amount)) return "Amount must be greater than 0";
    return "";
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
        amountError: name === "amount" ? validateAmount(value) : prevState.amountError,
        accountSecretError: name === "accountSecret" ? validateAccountSecret(value) : prevState.accountSecretError,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // Validate inputs before submission
    const amountError = validateAmount(formStates.amount);
    const accountSecretError = validateAccountSecret(formStates.accountSecret);

    if (amountError || accountSecretError) {
      setFormStates((prevState) => ({
        ...prevState,
        amountError,
        accountSecretError,
      }));
      return; // Stop form submission if validation fails
    }

    // Call the addMoney function here
    setLoading(true);
    const { data, error } = await addMoney({
      accountNo,
      amount: formStates.amount,
      accountSecret: formStates.accountSecret,
    });
    setError(error);
    setLoading(false);

    if (data?._id) {
      navigate("/bank-accounts", { replace: true });
    }
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (!accountName || !accountNo || !balance) {
    return <Navigate to="/bank-accounts" replace />;
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Add Money</h1>
        <div className="input-group flex-column border-none">
          <p>
            Account Name: <span>{accountName}</span>
          </p>
          <p>
            Account No: <span>{accountNo}</span>
          </p>
          <p>
            Current Balance: <span>{balance}</span>
          </p>
        </div>
        {formInputs.map((input) => (
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
        ))}

        <button type="submit" disabled={formInputs.some((input) => input.error)}>
          Submit
        </button>
      </form>
    </div>
  );
};
