import { Trash } from "lucide-react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/orderSlice";

export const CartItem = ({ id, name, description, imageUrl, price, quantity }) => {
  const dispatch = useDispatch();

  const formattedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;

  const handleIncrementClick = () => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  const handleDecrementClick = () => {
    dispatch(addToCart({ productId: id, quantity: -1 }));
  };

  const handleDeleteClick = () => {
    dispatch(addToCart({ productId: id, quantity: -quantity }));
  };

  return (
    <div className="cart-item">
      <img src={imageUrl} alt={name} />
      <div className="cart-item-info">
        <h3 className="name">{name}</h3>
        <div className="flex-justify-between desc-quantity-price">
          <p className="description flex-1">{formattedDescription}</p>
          <div className="flex border-none margin-none">
            <button className="icon-btn" onClick={handleIncrementClick}>
              +
            </button>
            <p>{quantity}</p>
            <button className="error-icon-btn" onClick={handleDecrementClick}>
              -
            </button>
          </div>
          <p className="price">&#x09F3;{price}</p>
        </div>
        <button onClick={handleDeleteClick} className="delete-btn">
          <Trash size={24} strokeWidth={1} color="#F24E1E" />
        </button>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
