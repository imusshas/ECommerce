import { useState } from "react";
import { createBankAccount } from "../utils/apiCalls";

export const CreateBankAccountPage = () => {
  const [formStates, setFormStates] = useState({
    accountNo: "",
    balance: 0,
    accountSecret: "",
  });

  const [submittedOnce, setSubmittedOnce] = useState(false);
  const formInputs = [
    {
      type: "text",
      name: "accountNo",
      field: "Account No",
      placeholder: "Enter Account No",
      value: formStates.accountNo,
      error: submittedOnce
        ? formStates.accountNo
          ? /^\d{12}$/.test(formStates.accountNo)
            ? ""
            : "Account Number must contain exactly 12 digits"
          : "Account Number is required"
        : "",
    },
    {
      type: "number",
      name: "balance",
      field: "Bank Balance",
      placeholder: "Enter Amount",
      value: formStates.balance,
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
    if (!formStates.accountNo || !formStates.balance || !formStates.accountSecret) {
      return;
    }

    // Call the createBankAccount function here
    const updatedAccount = await createBankAccount({
      accountNo: formStates.accountNo,
      balance: formStates.balance,
      accountSecret: formStates.accountSecret,
    });

    if (updatedAccount?._id) {
      alert("Bank Account created successfully");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Create Bank Account</h1>
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
