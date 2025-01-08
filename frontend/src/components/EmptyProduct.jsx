import { Atom } from "lucide-react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const EmptyProduct = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <Atom size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">Ops! {user.role === "Customer" ? "Nothing to shop" : "No product"}</p>
        {user.role === "Supplier" ? (
          <Link to="/create-product" className="link-btn">
            Create One
          </Link>
        ) : (
          <p className="text-success">Enjoy the day</p>
        )}
      </div>
    </div>
  );
};
