import { Atom } from "lucide-react";

export const EmptyTransactionHistory = () => {

  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <Atom size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">Ops! No transaction</p>
        <p className="text-success">Come later</p>
      </div>
    </div>
  );
};
