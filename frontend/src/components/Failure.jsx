import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCart } from "../reducers/orderSlice";


export const Failure = () => {
  const { error } = useSelector((state) => state.order);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!error) {
      navigate("/", { replace: true });
    }
  }, [error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getCart());
    navigate("/", { replace: true });
  };

  return (
    <div className="form-wrapper failure">
      <form onSubmit={handleSubmit} className="bg">
        <h1 className="form-title error">Payment Failed</h1>
        <p className="error-code">{error?.statusCode ? error.statusCode : "Error"}</p>
        <p className="error-message">{error?.statusText ? error.statusText : "Something went wrong"}</p>
        <p>{error?.message}</p>
        <button type="submit" className="error-link-btn">
          Back to Home
        </button>
      </form>
    </div>
  );
};
