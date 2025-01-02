import PropTypes from "prop-types";

export const ViewProduct = ({ name, price, imageUrl, description }) => {
  return (
    <div className="flex">
      <img src={imageUrl} alt={name} className="flex-img" />
      <div className="flex-column flex-column-small border-none margin-none">
        <h3 className="name">{name}</h3>
        <p className="description">{description}</p>
        <p className="price">{price}</p>
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
