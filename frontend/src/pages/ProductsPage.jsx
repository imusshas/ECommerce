import { useEffect, useState } from "react";
import { getProducts } from "../utils/apiCalls";
import { ViewProduct } from "../components/ViewProduct";
import { EmptyProduct } from "../components/EmptyProduct";

export const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.log("Error while getting products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  if (products.length === 0) {
    return <EmptyProduct />;
  }

  return (
    <div className="">
      {products.map((product) => (
        <ViewProduct key={product._id} {...product} />
      ))}
    </div>
  );
};
