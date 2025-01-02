import { ListTodo } from "lucide-react";

export const EmptyOrderRequest = () => {
  return (
    <div className="empty-cart-wrapper">
      <div className="empty-cart">
        <ListTodo size={320} strokeWidth={1} color="#007000" />
        <p className="empty-cart-title">No pending order</p>
        <p className="success-text" >Enjoy the day</p>
      </div>
    </div>
  );
};
