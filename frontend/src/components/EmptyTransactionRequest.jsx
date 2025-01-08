import { BadgeJapaneseYen } from "lucide-react";

export const EmptyTransactionRequest = () => {
  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <BadgeJapaneseYen size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">No pending transaction</p>
        <p className="text-success">Enjoy the day</p>
      </div>
    </div>
  );
};
