import { useEffect, useState } from "react";
import { getProducts } from "../utils/apiCalls";
import { Product } from "../components/Product";
import { useDispatch } from "react-redux";
import { getCart } from "../reducers/orderSlice";
import { EmptyProduct } from "../components/EmptyProduct";

export const HomePageCustomer = () => {

  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);


  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);


  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
    };

    fetchProducts();
  }, []);

  if(products.length === 0) {
    return <EmptyProduct />
  }
  
  return <div className="layout">{products.map((product) => <Product key={product._id} {...product} />)}</div>;
};
