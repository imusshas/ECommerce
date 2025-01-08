import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { signup } from "../../reducers/authSlice";

export const SignupPage = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const userRoles = {
    customer: "Customer",
    eCommerce: "E-commerce",
    supplier: "Supplier",
    bank: "Bank",
  };

  const [formStates, setFormStates] = useState({
    role: userRoles.customer,
    name: "",
    email: "",
    password: "",
    nameError: "",
    emailError: "",
    passwordError: "",
  });

  const [submittedOnce, setSubmittedOnce] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const formInputs = [
    {
      type: "text",
      name: "name",
      field: "Full Name",
      placeholder: "Enter Full Name",
      value: formStates.name,
      error: submittedOnce ? formStates.nameError : "",
    },
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

  const validateName = (name) => {
    if (!name) return "Full name is required";
    return "";
  };

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

  const handleRoleClick = (role) => {
    setFormStates((prevState) => ({
      ...prevState,
      role,
    }));
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
        nameError: name === "name" ? validateName(value) : prevState.nameError,
        emailError: name === "email" ? validateEmail(value) : prevState.emailError,
        passwordError: name === "password" ? validatePassword(value) : prevState.passwordError,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // Validate inputs before submission
    const nameError = validateName(formStates.name);
    const emailError = validateEmail(formStates.email);
    const passwordError = validatePassword(formStates.password);

    if (nameError || emailError || passwordError) {
      setFormStates((prevState) => ({
        ...prevState,
        nameError,
        emailError,
        passwordError,
      }));
      return; // Stop form submission if validation fails
    }

    dispatch(
      signup({
        name: formStates.name,
        email: formStates.email,
        password: formStates.password,
        role: formStates.role,
      }),
    );
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
        <div className="flex">
          {Object.keys(userRoles).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleClick(userRoles[role])}
              className={`${
                formStates.role === userRoles[role] ? "btn-outlined btn-outlined-selected" : "btn-outlined"
              }`}
            >
              {userRoles[role]}
            </button>
          ))}
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
          Signup
        </button>

        <p>
          Already have an account? &nbsp;
          <Link to="/login" replace>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};
