import PropTypes from "prop-types";
import "../styles/Product.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/orderSlice";

export const Product = ({ _id: id, name, price, imageUrl, description }) => {
  const dispatch = useDispatch();

  const formattedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;


  const handleAddToCartButtonClick = () => {
    dispatch(addToCart({ productId: id, quantity: 1 }));
  };

  return (
    <div className="product">
      <img src={imageUrl} alt={name} className="product-img" />
      <div className="product-info">
        <div className="flex-justify-between">
          <p className="price">&#x09F3;{price}</p>
          <button onClick={handleAddToCartButtonClick}>Add to Cart</button>
        </div>
        <h3 className="name">{name}</h3>
        <p className="description">{formattedDescription}</p>
      </div>
    </div>
  );
};

Product.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
