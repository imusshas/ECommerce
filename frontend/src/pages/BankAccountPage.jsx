import { useEffect, useState } from "react";
import { getAccountInfo } from "../utils/apiCalls";
import "../styles/BankAccount.css";

export const BankAccountPage = () => {
  const [accountInfo, setAccountInfo] = useState({});

  const { accountName, accountNo, balance } = accountInfo;

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const accountInfo = await getAccountInfo();
      setAccountInfo(accountInfo);
    };

    fetchAccountInfo();
  }, []);

  return (
    <div className="layout-content-wrapper">
      <div className="account-info">
        <h2 className="form-title">Bank Account</h2>
        <p>
          Account Name: <span>{accountName}</span>
        </p>
        <p>
          Account Number: <span>{accountNo}</span>
        </p>
        <p>
          Balance: <span>{balance}</span>
        </p>
      </div>
    </div>
  );
};
