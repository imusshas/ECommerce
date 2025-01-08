import { useEffect, useState } from "react";
import { getProducts } from "../utils/apiCalls";
import { ViewProduct } from "../components/ViewProduct";
import { EmptyProduct } from "../components/EmptyProduct";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

export const ProductsPage = () => {

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const {data, error} = await getProducts();
      setProducts(data);
      setError(error);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <LoadingPage />;
  }

  if (error) {
    return <ErrorPage error={error} />;
  }

  if (products.length === 0) {
    return <EmptyProduct />;
  }

  return (
    <div className="flex-column">
      {products.map((product) => (
        <ViewProduct key={product._id} {...product} />
      ))}
    </div>
  );
};
