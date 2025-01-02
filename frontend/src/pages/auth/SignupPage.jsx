import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { signup } from "../../reducers/authSlice";
import "../../styles/Auth.css";

export const SignupPage = () => {
  const { loading, user, error } = useSelector((state) => state.auth);
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
      error: submittedOnce ? (formStates.name ? "" : "Full name is required") : "",
    },
    {
      type: "email",
      name: "email",
      field: "Email",
      placeholder: "Enter Email",
      value: formStates.email,
      error: submittedOnce
        ? formStates.email
          ? emailRegex.test(formStates.email)
            ? ""
            : "Invalid email"
          : "Email is required"
        : "",
    },
    {
      type: "password",
      name: "password",
      field: "Password",
      placeholder: "Enter Password",
      value: formStates.password,
      error: submittedOnce
        ? formStates.password
          ? formStates.password.length < 6
            ? "Password must contain at least 6 characters"
            : ""
          : "Password is required"
        : "",
    },
  ];

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // If there are errors, prevent form submission
    if (!formStates.name || !formStates.email || !formStates.password) {
      return;
    }

    dispatch(
      signup({ name: formStates.name, email: formStates.email, password: formStates.password, role: formStates.role }),
    );
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Signup: {error}</p>;
  }

  return (
    <div className="form-wrapper">
      <form onSubmit={handleSubmit}>
        <h1 className="form-title">
          <img src="/commercac.png" alt="" />
        </h1>
        <div className="role-buttons">
          {Object.keys(userRoles).map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => handleRoleClick(userRoles[role])}
              className={`${formStates.role === userRoles[role] ? "selected" : ""}`}
            >
              {userRoles[role]}
            </button>
          ))}
        </div>

        {formInputs.map((input) => (
          <div key={input.name} className="input-group">
            <label htmlFor={input.name} className="input-label">{input.field}</label>
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
