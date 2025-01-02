import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyOrderHistory = () => {
  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <ShoppingBag size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title" >Your order is empty</p>
        <Link to="/" replace className="link-btn">
          Go to Shopping
        </Link>
      </div>
    </div>
  );
};
