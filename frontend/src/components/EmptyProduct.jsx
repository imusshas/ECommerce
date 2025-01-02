import { Atom } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const EmptyProduct = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <Atom size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title">Ops! {user.role === "Customer" ? "Nothing to shop" : "No product"}</p>
        {user.role === "Supplier" && (
          <Link to="/create-product" className="link-btn">
            Create One
          </Link>
        )}
      </div>
    </div>
  );
};
