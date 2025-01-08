import { Boxes } from "lucide-react";

export const EmptySupplyRequest = () => {
  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <Boxes size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">No pending order</p>
        <p className="text-success">Enjoy the day</p>
      </div>
    </div>
  );
};
