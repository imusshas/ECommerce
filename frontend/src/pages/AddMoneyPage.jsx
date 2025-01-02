import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { addMoney } from "../utils/apiCalls";

export const AddMoneyPage = () => {
  const location = useLocation();
  const { accountName, accountNo, balance } = location.state || {};
  const navigate = useNavigate();

  const [formStates, setFormStates] = useState({
    amount: 0,
    accountSecret: "",
  });

  const [submittedOnce, setSubmittedOnce] = useState(false);

  const formInputs = [
    {
      type: "number",
      name: "amount",
      field: "Amount",
      placeholder: "Enter Amount",
      value: formStates.amount,
      error: submittedOnce
        ? !formStates.amount
          ? "Amount is required"
          : formStates.amount <= 0 || isNaN(formStates.amount)
          ? "Amount must be greater than 0"
          : ""
        : "",
    },
    {
      type: "password",
      name: "accountSecret",
      field: "Account Secret",
      placeholder: "Enter Account Secret",
      value: formStates.accountSecret,
      error: submittedOnce
        ? formStates.accountSecret
          ? formStates.accountSecret.length < 6
            ? "Account secret must contain at least 6 characters"
            : ""
          : "Account secret is required"
        : "",
    },
  ];

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormStates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);
    if (!formStates.amount || !formStates.accountSecret) {
      return;
    }

    // Call the addMoney function here
    const updatedAccount = await addMoney({
      accountNo,
      amount: formStates.amount,
      accountSecret: formStates.accountSecret,
    });

    if (updatedAccount?._id) {
      navigate("/bank-accounts", { replace: true });
    }
  };

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
