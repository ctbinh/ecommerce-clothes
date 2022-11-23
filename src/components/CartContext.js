import React, { createContext, useState } from "react";
// Initiate Context
const CartContext = createContext();
// Provide Context
export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [update, setUpdate] = useState(false);
  const [targetDistrict, setTargetDistrict] = useState(null);
  const [targetWard, setTargetWard] = useState(null);
  const [targetService, setTargetService] = useState(null);
  const [targetProvince, setTargetProvince] = useState(null);

  return (
    <CartContext.Provider
      value={{
        items,
        setItems,
        update,
        setUpdate,
        targetDistrict,
        setTargetDistrict,
        targetWard,
        setTargetWard,
        targetService,
        setTargetService,
        targetProvince,
        setTargetProvince,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
