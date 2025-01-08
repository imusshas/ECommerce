import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyOrderHistory = () => {
  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <ShoppingBag size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">Your order is empty</p>
        <Link to="/" replace className="link-btn">
          Go to Shopping
        </Link>
      </div>
    </div>
  );
};
