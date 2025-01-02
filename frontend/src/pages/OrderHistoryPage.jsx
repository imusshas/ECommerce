import { useEffect, useState } from "react";
import { getOrderHistory } from "../utils/apiCalls";
import { OrderHistoryItem } from "../components/OrderHistoryItem";

import "../styles/OrderHistory.css";
import { EmptyOrderHistory } from "../components/EmptyOrderHistory";

export const OrderHistoryPage = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    const statusOrder = ["Pending", "Approved Unpaid", "Approved Paid", "Shipping", "Delivered"];

    const fetchOrderHistory = async () => {
      const orderHistory = await getOrderHistory();
      orderHistory.sort((a, b) => statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status));
      setOrderHistory(orderHistory);
    };

    fetchOrderHistory();
  }, []);

  if (orderHistory.length === 0) {
    return <EmptyOrderHistory />;
  }

  return (
    <div>
      {orderHistory.map((order) => (
        <OrderHistoryItem key={order._id} {...order} />
      ))}
    </div>
  );
};
