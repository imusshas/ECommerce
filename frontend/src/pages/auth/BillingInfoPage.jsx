import { useState } from "react";
import { addBillingInfo } from "../../utils/apiCalls";
import { useDispatch } from "react-redux";
import { getUser, logout } from "../../reducers/authSlice";
import { LoadingPage } from "../LoadingPage";
import { ErrorPage } from "../ErrorPage";

export const BillingInfoPage = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formStates, setFormStates] = useState({
    accountNo: "",
    accountSecret: "",
    accountNoError: "",
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
        accountSecretError: name === "accountSecret" ? validateAccountSecret(value) : prevState.accountSecretError,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // Validate the inputs before submitting
    const accountNoError = validateAccountNo(formStates.accountNo);

    const accountSecretError = validateAccountSecret(formStates.accountSecret);

    if (accountNoError || accountSecretError) {
      setFormStates((prevState) => ({
        ...prevState,
        accountNoError,
        accountSecretError,
      }));
      return; // Stop form submission if validation fails
    }

    // Proceed with API call if validation is passed
    setLoading(true);
    console.log(formStates);
    const { error } = await addBillingInfo({
      accountNo: formStates.accountNo,
      accountSecret: formStates.accountSecret,
    });

    setError(error);
    setLoading(false);

    if (!error) {
      dispatch(getUser());
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="form-wrapper flex-column flex-center border-none">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">Billing Information</h1>
        <p className="error">Please add your billing information to proceed further</p>
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

        <div className="flex">
          <button type="submit" disabled={formInputs.some((input) => input.error)} className="btn">
            Submit
          </button>

          <button type="button" onClick={handleLogout} className="error-btn">
            Logout
          </button>
        </div>
      </form>
    </div>
  );
};
