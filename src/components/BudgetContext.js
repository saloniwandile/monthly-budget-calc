import React, { createContext, useContext, useState } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }]; // <- important
    });
  };

  const removeFromCart = (item) => {
    // setCartItems(prev => {
    //   const existing = prev.find(i => i.id === item.id);
    //   if (existing.quantity === 1) {
    //     return prev.filter(i => i.id !== item.id);
    //   }
    //   return prev.map(i =>
    //     i.id === item.id ? { ...i, quantity: 0 } : i
    //   );
    // });

    setCartItems((prev) => prev.filter((i) => i.id !== item.id));
  };

  const updateQuantity = (itemId, amount) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.id === itemId
          ? { ...i, quantity: Math.max(i.quantity + amount, 1) }
          : i
      )
    );
  };

  return (
    <BudgetContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
