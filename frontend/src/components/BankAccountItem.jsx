import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const BankAccountItem = ({ _id: id, accountName, accountNo, balance }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/add-money/${id}`, { state: { id, accountName, accountNo, balance } });
  };

  return (
    <div className="w-full flex-column flex-column-small border border-large padding">
      <div className="flex-justify-between">
        <p className="text-bold">
          Account Name: <span>{accountName}</span>
        </p>
        <button onClick={handleClick} className="btn-outlined" disabled={accountName ? false : true}>
          Add Money
        </button>
      </div>
      <p className="text-bold">
        Account Number: <span>{accountNo}</span>
      </p>
      <p className="text-bold">
        Balance: <span className="price" >&#x09F3;{balance}</span>
      </p>
    </div>
  );
};

BankAccountItem.propTypes = {
  _id: PropTypes.string.isRequired,
  accountName: PropTypes.string,
  accountNo: PropTypes.string.isRequired,
  balance: PropTypes.number.isRequired,
};
