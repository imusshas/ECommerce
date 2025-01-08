import PropTypes from "prop-types";

export const ViewProduct = ({ name, price, imageUrl, description }) => {
  return (
    <div className="w-full flex border border-large">
      <img src={imageUrl} alt={name} className="flex-img" />
      <div className="flex-column gap-vertical-small flex-1">
        <h3 className="name">{name}</h3>
        <p className="description">{description}</p>
        <p className="price">&#x09F3;{price}</p>
      </div>
    </div>
  );
};

ViewProduct.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
