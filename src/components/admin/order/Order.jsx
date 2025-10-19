import React, { useState } from "react";
import OrderTable from "./OrderTable";
import { useOrder } from "../../hooks/useOrder";

const Order = () => {
  const { data: order, isLoading, isError } = useOrder();
  const [statusSelected, setStatusSelected] = useState("All");
  const [statOpen, setStatOpen] = useState(false);
  const [orderDateSelected, setOrderDateSelected] = useState("All");
  const [dateOpen, setDateOpen] = useState(false);
  const status = ["All", "Shipped", "Processing", "Deliverd"];
  const orderDate = ["All", "Newest", "Latest"];

  const handleStatusChange = (status) => {
    setStatusSelected(status);
    setStatOpen(false);
  };

  const handleDateChange = (rangeDate) => {
    setOrderDateSelected(rangeDate);
    setDateOpen(false);
  };

  if (isLoading)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    );

  if (isError)
    return (
      <div className="min-h-[200px] w-full flex items-center justify-center">
        <p className="text-center text-3xl">Oops! An Error Occurred</p>
      </div>
    );

  let filteredProducts =
    statusSelected === "All"
      ? order
      : order.filter(
          (ord) => ord.status.toLowerCase() === statusSelected.toLowerCase()
        );

  if (orderDateSelected === "Newest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );
  } else if (orderDateSelected === "Latest") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }

  return (
    <div>
      <OrderTable
        setDateOpen={setDateOpen}
        setStatOpen={setStatOpen}
        dateOpen={dateOpen}
        statOpen={statOpen}
        statusSelected={statusSelected}
        orderDateSelected={orderDateSelected}
        handleStatusChange={handleStatusChange}
        handleDateChange={handleDateChange}
        status={status}
        orderDate={orderDate}
        filteredProducts={filteredProducts}
      />
    </div>
  );
};

export default Order;
