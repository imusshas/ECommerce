import { useEffect, useState } from "react";
import { getProducts } from "../utils/apiCalls";
import { Product } from "../components/Product";
import { useDispatch } from "react-redux";
import { getCart } from "../reducers/orderSlice";
import { EmptyProduct } from "../components/EmptyProduct";
import { LoadingPage } from "./LoadingPage";
import { ErrorPage } from "./ErrorPage";

export const HomePageCustomer = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await getProducts();
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
    <div className="grid">
      {products.map((product) => (
        <Product key={product._id} {...product} setLoading={setLoading} />
      ))}
    </div>
  );
};
