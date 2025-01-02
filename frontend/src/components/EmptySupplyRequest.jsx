import { Boxes } from "lucide-react";

export const EmptySupplyRequest = () => {
  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <Boxes size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title">No pending order</p>
        <p className="success-text" >Enjoy the day</p>
      </div>
    </div>
  );
};
