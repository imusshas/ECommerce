import { useEffect, useState } from "react";
import { getSupplyRequests } from "../utils/apiCalls";
import { SupplyRequestItem } from "../components/SupplyRequestItem";
import { EmptySupplyRequest } from "../components/EmptySupplyRequest";

export const HomePageSupplier = () => {
  const [supplyRequests, setSupplyRequests] = useState([]);

  const fetchSupplyRequest = async () => {
    const supplyRequests = await getSupplyRequests();
    setSupplyRequests(supplyRequests);
  };

  useEffect(() => {
    fetchSupplyRequest();
  }, []);

  if (supplyRequests.length === 0) {
    return <EmptySupplyRequest />;
  }

  return (
    <div className="grid">
      {supplyRequests.map((request) => (
        <SupplyRequestItem key={request.orderId} {...request} fetchSupplyRequest={fetchSupplyRequest} />
      ))}
    </div>
  );
};
