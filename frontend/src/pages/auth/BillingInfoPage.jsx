import { useState } from "react";
import "../../styles/Auth.css";
import { addBillingInfo } from "../../utils/apiCalls";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUser } from "../../reducers/authSlice";

export const BillingInfoPage = () => {
  const dispatch = useDispatch();

  const [formStates, setFormStates] = useState({
    accountNo: "",
    accountSecret: "",
  });

  const [submittedOnce, setSubmittedOnce] = useState(false);
  const [bankAccount, setBankAccount] = useState({});

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

    if (!formStates.accountNo || !formStates.accountSecret) {
      return;
    }

    // Call the createBankAccount function here
    const updatedAccount = await addBillingInfo({
      accountNo: formStates.accountNo,
      accountSecret: formStates.accountSecret,
    });

    dispatch(getUser());

    setBankAccount(updatedAccount);
  };

  return (
    <div className="form-wrapper flex-column flex-center border-none">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Billing Information</h1>
        {!bankAccount?._id && <p className="error">Please add your billing information to proceed further</p>}
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
                disabled={bankAccount?._id}
              />
              <p className="error">{input.error}</p>
            </div>
          </div>
        ))}

        <button type="submit" disabled={formInputs.some((input) => input.error) || bankAccount?._id} className="btn">
          Submit
        </button>
      </form>

      {bankAccount?._id && (
        <div className="flex-column flex-column-small flex-center">
          <div className="flex-column flex-column-small border-none margin-none">
            <p>
              Account Name: <span>{bankAccount?.accountName}</span>
            </p>
            <p>
              Account Number: <span>{bankAccount?.accountNo}</span>
            </p>
            <p>
              Balance: <span>{bankAccount?.balance}</span>
            </p>
          </div>
          <Link to="/" className="link-btn">
            Go to Home
          </Link>
        </div>
      )}
    </div>
  );
};
