import { Truck } from "lucide-react";

export const EmptyDeliveryRequest = () => {
  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <Truck size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title">No pending delivery</p>
        <p className="success-text">Enjoy the day</p>
      </div>
    </div>
  );
};
