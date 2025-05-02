import React, { createContext, useContext, useState } from "react";

// const BudgetContext = createContext();

// export const useBudget = () => useContext(BudgetContext);

// export const BudgetProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (item) => {
//     // setCartItems(prev => [...prev, item]);
//     setCartItems((prev) => {
//         const existingItem = prev.find((i) => i.id === item.id)
//         if(existingItem){
//             return prev.map(i => 
//                 i.id === item.id ? {...i, quantity:i.quantity+1} : i
//             );
//         } else {
//             return prev => [...prev, {...item, quantity:1  }];
//         }
//     }
       

    
//     );
//   };

//   const removeFromCart = (item) => {
//     // setCartItems((prev) => prev.filter((i) => i.id !== item.id));

//     setCartItems(prev => {
//         const existingItem = prev.find((i) => i.id === item.id)
//         if(existingItem.quantity ===1){
//             return prev.filter((i) => i.id !== item.id);
//         }
//         else prev.map((i)=>
//             i.id === item.id ? {...i, quantity:i.quantity-1} : i)
        
//     })
//   };

//   return (
//     <BudgetContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
//       {children}
//     </BudgetContext.Provider>
//   );
// };


const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // ✅ initialize as []

  const addToCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        return prev.map(i =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (item) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing.quantity === 1) {
        return prev.filter(i => i.id !== item.id);
      }
      return prev.map(i =>
        i.id === item.id ? { ...i, quantity: i.quantity - 1 } : i
      );
    });
  };

  return (
    <BudgetContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
