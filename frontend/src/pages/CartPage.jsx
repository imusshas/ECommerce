import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CartItem } from "../components/CartItem";
import { EmptyCart } from "../components/EmptyCart";
import { LoadingPage } from "./LoadingPage";

export const CartPage = () => {
  const { loading, cart } = useSelector((state) => state.order);

  if (loading) {
    return <LoadingPage />;
  }
  
  if (Object.keys(cart.products).length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="flex">
      <div className="flex-column self-start flex-2">
        {Object.values(cart.products).map((product) => {
          return <CartItem key={product.id} {...product} />;
        })}
      </div>
      <div className="flex-column self-start flex-1">
        {Object.values(cart.products).map((product) => {
          const totalPrice = product.price * product.quantity;
          return (
            <div key={product.id} className="flex-justify-between">
              <p>
                {product.quantity}x&nbsp;&nbsp;&nbsp;&nbsp;<span>{product.name}</span>
              </p>
              <p>&#x09F3;{totalPrice}</p>
            </div>
          );
        })}
        <hr className="w-full" />
        <div className="flex-justify-between margin-vertical">
          <p className="text-medium text-bold">Total</p>
          <p className="text-medium price">&#x09F3;{cart.amount}</p>
        </div>
        <Link to="/payment" className="link-btn self-end">
          Checkout
        </Link>
      </div>
    </div>
  );
};
