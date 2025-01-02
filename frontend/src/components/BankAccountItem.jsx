import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const BankAccountItem = ({ _id: id, accountName, accountNo, balance }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/add-money/${id}`, { state: { id, accountName, accountNo, balance } });
  };

  return (
    <div className="flex-column flex-column-small">
      <div className="flex-justify-between">
        <p>
          Account Name: <span>{accountName}</span>
        </p>
        <button onClick={handleClick} className="btn-outlined" disabled={accountName ? false : true}>
          Add Money
        </button>
      </div>
      <p>
        Account Number: <span>{accountNo}</span>
      </p>
      <p>
        Balance: <span>{balance}</span>
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
