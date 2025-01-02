import { useState, useEffect } from "react";
import { getBankAccounts } from "../utils/apiCalls";
import { BankAccountItem } from "../components/BankAccountItem";

export const BankAccountsPage = () => {
  const [bankAccounts, setBankAccounts] = useState([]);

  useEffect(() => {
    const fetchBankAccounts = async () => {
      const bankAccounts = await getBankAccounts();
      setBankAccounts(bankAccounts);
    };

    fetchBankAccounts();
  }, []);

  return <div>{bankAccounts.map((bankAccount) => <BankAccountItem key={bankAccount._id} {...bankAccount} />)}</div>;
};
