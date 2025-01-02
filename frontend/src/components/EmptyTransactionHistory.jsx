import { Atom } from "lucide-react";

export const EmptyTransactionHistory = () => {

  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <Atom size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title">Ops! No transaction</p>
        <p className="success-text">Come later</p>
      </div>
    </div>
  );
};
