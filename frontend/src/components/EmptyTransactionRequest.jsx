import { BadgeJapaneseYen } from "lucide-react";

export const EmptyTransactionRequest = () => {
  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <BadgeJapaneseYen size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title">No pending transaction</p>
        <p className="success-text" >Enjoy the day</p>
      </div>
    </div>
  );
};
