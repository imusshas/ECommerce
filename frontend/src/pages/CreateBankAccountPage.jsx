import { useState } from "react";
import { createBankAccount } from "../utils/apiCalls";
import { LoadingPage } from "./LoadingPage";
import { BankAccountItem } from "../components/BankAccountItem";
import { ErrorPage } from "./ErrorPage";

export const CreateBankAccountPage = () => {
  const [loading, setLoading] = useState(false);
  const [bankAccount, setBankAccount] = useState({});
  const [error, setError] = useState(null);

  const [formStates, setFormStates] = useState({
    accountNo: "",
    balance: "",
    accountSecret: "",
    accountNoError: "",
    balanceError: "",
    accountSecretError: "",
  });

  const [submittedOnce, setSubmittedOnce] = useState(false);

  const formInputs = [
    {
      type: "text",
      name: "accountNo",
      field: "Account No",
      placeholder: "Enter Account No",
      value: formStates.accountNo,
      error: submittedOnce ? formStates.accountNoError : "",
    },
    {
      type: "number",
      name: "balance",
      field: "Bank Balance",
      placeholder: "Enter Amount",
      value: formStates.balance,
      error: submittedOnce ? formStates.balanceError : "",
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

  const validateAccountNo = (accountNo) => {
    if (!accountNo) return "Account Number is required";
    if (!/^\d{12}$/.test(accountNo)) return "Account Number must contain exactly 12 digits";
    return "";
  };

  const validateBalance = (balance) => {
    if (!balance) return "Amount is required";
    if (balance <= 0 || isNaN(balance)) return "Amount must be greater than 0";
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
        accountNoError: name === "accountNo" ? validateAccountNo(value) : prevState.accountNoError,
        balanceError: name === "balance" ? validateBalance(value) : prevState.balanceError,
        accountSecretError: name === "accountSecret" ? validateAccountSecret(value) : prevState.accountSecretError,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // Validate inputs before submission
    const accountNoError = validateAccountNo(formStates.accountNo);
    const balanceError = validateBalance(formStates.balance);
    const accountSecretError = validateAccountSecret(formStates.accountSecret);

    if (accountNoError || balanceError || accountSecretError) {
      setFormStates((prevState) => ({
        ...prevState,
        accountNoError,
        balanceError,
        accountSecretError,
      }));
      return; // Stop form submission if validation fails
    }

    // Call the createBankAccount function
    setLoading(true);
    const { data, error } = await createBankAccount({
      accountNo: formStates.accountNo,
      balance: formStates.balance,
      accountSecret: formStates.accountSecret,
    });
    setBankAccount(data);
    setError(error);
    setLoading(false);
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="flex-column">
      <form onSubmit={handleSubmit} className="w-full">
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

      {bankAccount?._id && <BankAccountItem {...bankAccount} />}
    </div>
  );
};
