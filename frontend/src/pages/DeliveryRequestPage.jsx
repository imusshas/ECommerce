import { useEffect, useState } from "react";
import { getDeliveryRequests } from "../utils/apiCalls";
import { DeliveryRequestItem } from "../components/DeliveryRequestItem";
import { EmptyDeliveryRequest } from "../components/EmptyDeliveryRequest";

export const DeliveryRequestPage = () => {
  const [deliveryRequests, setDeliveryRequests] = useState([]);

  const fetchDeliveryRequests = async () => {
    try {
      const deliveryRequests = await getDeliveryRequests();
      setDeliveryRequests(deliveryRequests);
    } catch (error) {
      console.log("Error while getting delivery requests:", error);
      return [];
    }
  };

  useEffect(() => {
    fetchDeliveryRequests();
  }, []);

  if (deliveryRequests.length === 0) {
    return <EmptyDeliveryRequest />;
  }

  return (
    <div>
      {deliveryRequests.map((deliveryRequest) => (
        <DeliveryRequestItem
          key={deliveryRequest.orderId}
          {...deliveryRequest}
          fetchDeliveryRequests={fetchDeliveryRequests}
        />
      ))}
    </div>
  );
};
