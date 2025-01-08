import { ShoppingBasket } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyCart = () => {
  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <ShoppingBasket size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">Your cart is empty</p>
        <Link to="/" replace className="link-btn">
          Go to Shopping
        </Link>
      </div>
    </div>
  );
};
