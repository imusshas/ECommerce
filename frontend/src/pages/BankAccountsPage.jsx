import { useState, useEffect } from "react";
import { getBankAccounts } from "../utils/apiCalls";
import { BankAccountItem } from "../components/BankAccountItem";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";
import { EmptyBankAccounts } from "../components/EmptyBankAccounts";

export const BankAccountsPage = () => {
  const [loading, setLoading] = useState(true);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      const { data, error } = await getBankAccounts();
      setBankAccounts(data);
      setError(error);
      setLoading(false);
    };

    fetchBankAccounts();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (bankAccounts.length === 0) {
    return <EmptyBankAccounts />;
  }

  return (
    <div className="w-full flex-column">
      {bankAccounts.map((bankAccount) => (
        <BankAccountItem key={bankAccount._id} {...bankAccount} />
      ))}
    </div>
  );
};
