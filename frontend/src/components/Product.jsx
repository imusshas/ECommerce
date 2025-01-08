import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart } from "../reducers/orderSlice";

export const Product = ({ _id: id, name, price, imageUrl, description, setLoading }) => {
  const dispatch = useDispatch();

  const formattedDescription = description.length > 100 ? `${description.slice(0, 100)}...` : description;

  const handleAddToCartButtonClick = () => {
    setLoading(true);
    dispatch(addToCart({ productId: id, quantity: 1 }));
    setTimeout(() => {
      setLoading(false);
    }, 1000); // simulate loading time for demonstration purposes
  };

  return (
    <div className="border border-large">
      <img src={imageUrl} alt={name} className="grid-img" />
      <div className="flex-column gap-vertical-small padding-small padding-vertical">
        <div className="flex-justify-between">
          <p className="price">&#x09F3;{price}</p>
          <button onClick={handleAddToCartButtonClick}>Add to Cart</button>
        </div>
        <h3 className="text-bold">{name}</h3>
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
  setLoading: PropTypes.func.isRequired,
};
