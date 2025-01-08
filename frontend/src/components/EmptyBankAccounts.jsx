import { KeyRound } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyBankAccounts = () => {
  return (
    <div className="absolute position-center">
      <div className="flex-column flex-center">
        <KeyRound size={320} strokeWidth={1} color="#00b000" />
        <p className="text-large text-disabled">Ops! No account</p>
        <Link to="/create-bank-account" className="link-btn">
          Create One
        </Link>
      </div>
    </div>
  );
};
