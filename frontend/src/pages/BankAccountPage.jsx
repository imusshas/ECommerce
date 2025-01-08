import { useEffect, useState } from "react";
import { getAccountInfo } from "../utils/apiCalls";
import {LoadingPage} from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

export const BankAccountPage = () => {

  const [loading, setLoading] = useState(true);
  const [accountInfo, setAccountInfo] = useState({});
  const [error, setError] = useState(null);

  const { accountName, accountNo, balance } = accountInfo;

  useEffect(() => {
    const fetchAccountInfo = async () => {
      const {data, error} = await getAccountInfo();
      setAccountInfo(data);
      setError(error);
      setLoading(false);
    };

    fetchAccountInfo();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  return (
    <div className="layout-content-wrapper">
      <div className="flex-column padding-medium border border-large absolute position-center">
        <h1 className="form-title self-center text-bold">Bank Account</h1>
        <p>
          Account Name: <span>{accountName}</span>
        </p>
        <p>
          Account Number: <span>{accountNo}</span>
        </p>
        <p>
          Balance: <span className="price">&#x09F3;{balance}</span>
        </p>
      </div>
    </div>
  );
};
