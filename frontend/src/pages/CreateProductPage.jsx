import { useState } from "react";
import { ImageUp } from "lucide-react";
import { createProduct } from "../utils/apiCalls";
import { ViewProduct } from "../components/ViewProduct";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

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
    <div className="flex-column">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="w-full grid-column-2">
          <div className="h-36">
            <label
              htmlFor="imageUrl"
              className={`w-full h-full h-32 flex-column flex-center border border-large input-label pointer ${
                formStates.imageUrlError ? "error-border" : ""
              }`}
            >
              {formStates.imageUrlError ? (
                <>
                  <ImageUp size={48} color="#b00000" />
                  <p className="error">{formStates.imageUrlError}</p>
                </>
              ) : imagePreview ? (
                <>
                  <img src={imagePreview} alt="Product" className="w-full h-full border-large" />
                </>
              ) : (
                <div className="flex-column flex-center">
                  <ImageUp size={48} />
                  <span className="placeholder">Upload Product Image</span>
                </div>
              )}
            </label>
            <input
              type="file"
              accept="image/*"
              name="imageUrl"
              id="imageUrl"
              placeholder="Upload Product Image"
              autoComplete="off"
              onChange={handleImageChange}
              className={formStates.imageUrlError ? "error" : ""}
            />
          </div>

          <div className="flex-1 flex-column">
            <div className="input-group">
              <label htmlFor="name" className="input-label">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter Product Name"
                autoComplete="off"
                value={formStates.name}
                onChange={handleInputChange}
                className={formStates.nameError ? "error" : ""}
              />
              <p className="error">{formStates.nameError}</p>
            </div>

            <div className="input-group">
              <label htmlFor="price" className="input-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Enter Price"
                autoComplete="off"
                value={formStates.price}
                onChange={handleInputChange}
                className={formStates.priceError ? "error" : ""}
              />
              <p className="error">{formStates.priceError}</p>
            </div>

            <div className="input-group">
              <label htmlFor="description" className="input-label">
                Product Description
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Enter Product Description"
                autoComplete="off"
                value={formStates.description}
                onChange={handleInputChange}
                className={formStates.descriptionError ? "error" : ""}
              />
              <p className="error">{formStates.descriptionError}</p>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="margin-vertical"
          disabled={
            formStates.imageUrlError || formStates.nameError || formStates.priceError || formStates.descriptionError
          }
        >
          Create Product
        </button>
      </form>
      {product?._id && (
        <div className="w-full flex-column gap-vertical-small">
          <h2 className="form-title">Product Created Successfully</h2>
          <ViewProduct {...product} />
        </div>
      )}
    </div>
  );
};
