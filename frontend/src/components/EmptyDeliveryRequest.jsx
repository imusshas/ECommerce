import { Truck } from "lucide-react";

export const EmptyDeliveryRequest = () => {
  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <Truck size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">No pending delivery</p>
        <p className="text-success">Enjoy the day</p>
      </div>
    </div>
  );
};
