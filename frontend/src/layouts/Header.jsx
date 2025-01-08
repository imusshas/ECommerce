import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../reducers/authSlice";
import { ShoppingCart } from "lucide-react";
import { LoadingPage } from "../pages/LoadingPage";
import { ErrorPage } from "../pages/ErrorPage";

export const Header = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.order);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} from="Header" />;
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
            <Link to="/cart" className="flex relative">
              <ShoppingCart color="#00b000" />
              {cart.products && Object.keys(cart.products).length > 0 && (
                <div className="circle-bg flex absolute icon-link-text-position">
                  <span className="text-small">{Object.keys(cart.products).length}</span>
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
