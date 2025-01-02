import { useState } from "react";
import "../styles/CreateProduct.css";
import { ImageUp } from "lucide-react";
import { createProduct } from "../utils/apiCalls";
import { ViewProduct } from "../components/ViewProduct";

export const CreateProductPage = () => {
  const [formStates, setFormStates] = useState({
    imageUrl: "",
    name: "",
    price: 0,
    description: "",
  });
  const [product, setProduct] = useState({});

  const [imagePreview, setImagePreview] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false);

  const imageInput = {
    type: "file",
    name: "imageUrl",
    field: "Product Image",
    placeholder: "Upload Product Image",
    accept: "image/*",
    value: formStates.image,
    error: submittedOnce ? (formStates.imageUrl ? "" : "Product image is required") : "",
  };

  const formInputs = [
    {
      type: "text",
      name: "name",
      field: "Name",
      placeholder: "Enter Product Name",
      value: formStates.name,
      error: submittedOnce ? (formStates.name ? "" : "Product name is required") : "",
    },
    {
      type: "number",
      name: "price",
      field: "Price",
      placeholder: "Enter Price",
      value: formStates.price,
      error: submittedOnce
        ? !formStates.price
          ? "Product price is required"
          : formStates.price <= 0 || isNaN(formStates.price)
          ? "Price must be greater than 0"
          : ""
        : "",
    },
    {
      type: "text",
      name: "description",
      field: "Product Description",
      placeholder: "Enter Product Description",
      value: formStates.description,
      error: submittedOnce ? (formStates.description ? "" : "Product description is required") : "",
      className: "create-product-description-input",
    },
  ];

  const handleImageChange = (e) => {
    e.preventDefault();

    const { name, files } = e.target;
    console.log(e);

    if (files && files[0]) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file)); // Create image preview
      setFormStates((prevState) => ({
        ...prevState,
        [name]: file,
      }));
    }
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormStates((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    console.log(formStates);
    if (!formStates.imageUrl || !formStates.name || !formStates.price || !formStates.description) {
      return;
    }

    const createdProduct = await createProduct({
      name: formStates.name,
      price: formStates.price,
      description: formStates.description,
      imageUrl: formStates.imageUrl,
    });

    setProduct(createdProduct);
  };

  return (
    <div className="layout-container">
      <form onSubmit={handleSubmit} className="create-product-form">
        <div className="create-product-form-content-wrapper">
          <div className="create-product-img-input-wrapper">
            <div className={`create-product-img-input border ${imageInput.error ? "error-border" : ""}`}>
              <label htmlFor={imageInput.name} className="input-label">
                {imageInput.error ? (
                  <>
                    <ImageUp size={48} color="#d24e1e" />
                    <p className="error">{imageInput.error}</p>
                  </>
                ) : imagePreview ? (
                  <>
                    <img src={imagePreview} alt="Product" />
                    {/* <span>Change Image</span> */}
                  </>
                ) : (
                  <>
                    <ImageUp size={48} />
                    <span>Upload Product Image</span>
                  </>
                )}
              </label>
            </div>
            <input
              type={imageInput.type}
              accept={imageInput.accept}
              name={imageInput.name}
              id={imageInput.name}
              placeholder={imageInput.placeholder}
              autoComplete="off"
              value={imageInput.value}
              onChange={handleImageChange}
              className={imageInput.error ? "error" : ""}
            />
          </div>

          <div className="create-product-text-input-group">
            {formInputs.map((input) => (
              <div key={input.name} className={`${input?.className || "input-group"}`}>
                <label htmlFor={input.name} className="input-label">
                  {input.field}
                </label>
                <div className={`${input?.className || ""}`}>
                  <input
                    type={input.type}
                    accept={input.accept}
                    name={input.name}
                    id={input.name}
                    placeholder={input.placeholder}
                    autoComplete="off"
                    value={input.value}
                    onChange={handleInputChange}
                    className={input.error ? "error" : input?.className || ""}
                  />
                  <p className="error">{input.error}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <button type="submit" disabled={formInputs.some((input) => input.error)}>
          Create Product
        </button>
      </form>
      {product?._id && (
        <div>
          <h2 className="form-title">Product Created Successfully</h2>
          <ViewProduct {...product} />
        </div>
      )}
    </div>
  );
};
