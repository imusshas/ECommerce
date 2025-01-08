import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/authSlice";

export const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formStates, setFormStates] = useState({
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
  });

  const [submittedOnce, setSubmittedOnce] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const formInputs = [
    {
      type: "email",
      name: "email",
      field: "Email",
      placeholder: "Enter Email",
      value: formStates.email,
      error: submittedOnce ? formStates.emailError : "",
    },
    {
      type: "password",
      name: "password",
      field: "Password",
      placeholder: "Enter Password",
      value: formStates.password,
      error: submittedOnce ? formStates.passwordError : "",
    },
  ];

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Invalid email";
    return "";
  };

  const validatePassword = (password) => {
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must contain at least 6 characters";
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
        emailError: name === "email" ? validateEmail(value) : prevState.emailError,
        passwordError: name === "password" ? validatePassword(value) : prevState.passwordError,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // Validate inputs before submission
    const emailError = validateEmail(formStates.email);
    const passwordError = validatePassword(formStates.password);

    if (emailError || passwordError) {
      setFormStates((prevState) => ({
        ...prevState,
        emailError,
        passwordError,
      }));
      return; // Stop form submission if validation fails
    }

    dispatch(login({ email: formStates.email, password: formStates.password }));
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">
          <img src="/commercac.png" alt="" />
        </h1>
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
          Login
        </button>

        <p>
          Don&apos;t have an account? &nbsp;
          <Link to="/signup" replace>
            Signup
          </Link>
        </p>
      </form>
    </div>
  );
};
