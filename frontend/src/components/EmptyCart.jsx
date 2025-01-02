import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <ShoppingBasket size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title" >Your cart is empty</p>
        <Link to="/" replace className="link-btn">
          Go to Shopping
        </Link>
      </div>
    </div>
  );
};
