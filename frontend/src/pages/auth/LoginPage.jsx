import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "../../styles/Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../reducers/authSlice";

export const LoginPage = () => {
  const { user, loading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [formStates, setFormStates] = useState({
    email: "",
    password: "",
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
    if (!formStates.email || !formStates.password) {
      return;
    }

    dispatch(login({ email: formStates.email, password: formStates.password }));
  };

  if (user) {
    return <Navigate to="/" replace />;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Login: {error}</p>;
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
