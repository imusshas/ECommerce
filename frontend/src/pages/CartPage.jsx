import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../components/CartItem";
import "../styles/Cart.css";
import { EmptyCart } from "../components/EmptyCart";

export const CartPage = () => {
  const { cart } = useSelector((state) => state.order);

  if (Object.keys(cart.products).length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="cart-container">
      {Object.values(cart.products).map((product) => {
        return <CartItem key={product.id} {...product} />;
      })}
      <div className="cart-total">
        {Object.values(cart.products).map((product) => {
          const totalPrice = product.price * product.quantity;
          return (
            <div key={product.id} className="flex-justify-between">
              <p>
                {product.quantity}x <span>{product.name}</span>
              </p>
              <p>&#x09F3;{totalPrice}</p>
            </div>
          );
        })}
        <hr />
        <div className="flex-justify-between total-price-wrapper">
          <p>Total:</p>
          <p className="total-price">&#x09F3;{cart.amount}</p>
        </div>
        <Link to="/payment" className="link-btn checkout-btn">
          Checkout
        </Link>
      </div>
    </div>
  );
};
