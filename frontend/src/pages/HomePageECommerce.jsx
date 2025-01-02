import { useEffect, useState } from "react";
import { getOrderRequests } from "../utils/apiCalls";
import { OrderRequestItem } from "../components/OrderRequestItem";
import { EmptyOrderRequest } from "../components/EmptyOrderRequest";

export const HomePageECommerce = () => {
  const [orderRequests, setOrderRequests] = useState([]);

  const fetchOrderRequests = async () => {
    try {
      const orderRequests = await getOrderRequests();
      setOrderRequests(orderRequests);
    } catch (error) {
      console.log("Error while getting order requests:", error);
      setOrderRequests([]);
    }
  };

  useEffect(() => {
    fetchOrderRequests();
  }, []);

  if (orderRequests.length === 0) {
    return <EmptyOrderRequest />;
  }

  return (
    <div className="grid">
      {orderRequests.map((orderRequest) => (
        <OrderRequestItem key={orderRequest.orderId} {...orderRequest} fetchOrderRequests={fetchOrderRequests} />
      ))}
    </div>
  );
};
