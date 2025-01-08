import { useState } from "react";
import "../styles/CreateProduct.css";
import { ImageUp } from "lucide-react";
import { createProduct } from "../utils/apiCalls";
import { ViewProduct } from "../components/ViewProduct";

export const CreateProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);

  const [formStates, setFormStates] = useState({
    imageUrl: "",
    name: "",
    price: "",
    description: "",
    imageUrlError: "",
    nameError: "",
    priceError: "",
    descriptionError: "",
  });
  const [imagePreview, setImagePreview] = useState("");
  const [submittedOnce, setSubmittedOnce] = useState(false);

  useEffect(() => {}, [imagePreview, setImagePreview]);

  // Create functions for validation
  // Validate imageUrl also
  const validateImageUrl = (imageUrl) => {
    if (!imageUrl) return "Product image is required";
    return "";
  };
  const validateName = (name) => {
    if (!name) return "Product name is required";
    return "";
  };

  const validatePrice = (price) => {
    if (!price) return "Product price is required";
    if (price <= 0 || isNaN(price)) return "Price must be greater than 0";
    return "";
  };

  const validateDescription = (description) => {
    if (!description) return "Product description is required";
    return "";
  };

  // Handle image change (upload)
  const handleImageChange = (e) => {
    e.preventDefault();

    const { name, files } = e.target;

    if (files && files[0]) {
      const file = files[0];
      setImagePreview(URL.createObjectURL(file)); // Create image preview
      setFormStates((prevState) => ({
        ...prevState,
        imageUrl: file, // Store the file object (not the value of the input)
      }));

      if (submittedOnce) {
        const imageUrlError = name === "imageUrl" ? validateImageUrl(file) : "";
        setFormStates((prevState) => ({
          ...prevState,
          imageUrlError,
        }));
      }
    }
  };

  // Handle input field changes
  const handleInputChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormStates((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Validate form fields if once submitted
    if (submittedOnce) {
      setFormStates((prevState) => ({
        ...prevState,
        nameError: name === "name" ? validateName(value) : "",
        priceError: name === "price" ? validatePrice(value) : "",
        descriptionError: name === "description" ? validateDescription(value) : "",
      }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedOnce(true);

    // Validate inputs before submission
    const imageUrlError = validateImageUrl(formStates.imageUrl);
    const nameError = validateName(formStates.name);
    const priceError = validatePrice(formStates.price);
    const descriptionError = validateDescription(formStates.description);

    if (imageUrlError || nameError || priceError || descriptionError) {
      setFormStates((prevState) => ({
        ...prevState,
        imageUrlError,
        nameError,
        priceError,
        descriptionError,
      }));
      return;
    }

    setLoading(true);
    const { data, error } = await createProduct({
      name: formStates.name,
      price: formStates.price,
      description: formStates.description,
      imageUrl: formStates.imageUrl,
    });
    setProduct(data);
    setError(error);
    setLoading(false);
  };

  // Show loading spinner if the product is being created
  if (loading) {
    return <LoadingPage />;
  }

  // Show error page if there's an error
  if (error) {
    return <ErrorPage error={error} />;
  }

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
