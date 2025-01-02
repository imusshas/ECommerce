import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";
import { ShoppingCart } from "lucide-react";

import "../styles/Header.css";

export const Header = () => {
  const { loading, error, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cart, loading: cartLoading, error: cartError } = useSelector((state) => state.order);

  if (loading || cartLoading) {
    return <p>Loading...</p>;
  }

  if (error || cartError) {
    console.log("error", error);
    console.log("cartError", cartError);

    return <p>{error ? `user error: ${error}` : `cartError: ${cartError}`}</p>;
  }

  const handleClick = () => {
    dispatch(logout());
  };

  return (
    <header>
      <h1>
        <Link to="/">
          <img src="/commercac.png" alt="Logo" className="logo" />
        </Link>
      </h1>
      <nav>
        {user.role === "Customer" ? (
          <>
            <Link to="/order-history">Orders</Link>
            <Link to="/account-info">Bank Account</Link>
            <Link to="/cart" className="cart-link">
              <ShoppingCart className="cart-icon" />
              {cart.products && Object.keys(cart.products).length > 0 && (
                <div>
                  <span>{Object.keys(cart.products).length}</span>
                </div>
              )}
            </Link>
          </>
        ) : user.role === "E-commerce" ? (
          <>
            <Link to="/delivery-requests">Delivery</Link>
            <Link to="/account-info">Bank Account</Link>
            <Link to="/products">Products</Link>
          </>
        ) : user.role === "Supplier" ? (
          <>
            <Link to="/create-product">Create</Link>
            <Link to="/account-info">Bank Account</Link>
            <Link to="/products">Products</Link>
          </>
        ) : (
          <>
            <Link to="/bank-accounts">Accounts</Link>
            <Link to="/create-bank-account">Create Account</Link>
            <Link to="/transaction-history">Transactions</Link>
          </>
        )}
        <button onClick={handleClick} className="error-btn">
          Logout
        </button>
      </nav>
    </header>
  );
};
