import React, { createContext, useContext, useState } from "react";

// Create the OrderContext
const OrderContext = createContext();

// Custom hook to use the OrderContext
export const useOrder = () => {
  return useContext(OrderContext);
};

// OrderProvider component to wrap around the application
const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]); // State to store orders

  // Function to add a new order
  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  // Function to clear all orders (optional utility)
  const clearOrders = () => {
    setOrders([]);
  };

  // Provide orders and functions as context values
  return (
    <OrderContext.Provider value={{ orders, addOrder, clearOrders }}>
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
