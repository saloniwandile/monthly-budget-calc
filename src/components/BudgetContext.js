// import React, { createContext, useContext, useState } from "react";

// const BudgetContext = createContext();

// export const BudgetProvider = ({ children }) => {
//   const [cartItems, setCartItems] = useState([]);
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]);

//   const addToCart = (item) => {
//     setCartItems((prev) => {
//       const existing = prev.find((i) => i.id === item.id);
//       if (existing) {
//         return prev.map((i) =>
//           i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
//         );
//       }
//       return [...prev, { ...item, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (item) => {
//     setCartItems((prev) => prev.filter((i) => i.id !== item.id));
//   };

//   const updateQuantity = (itemId, amount) => {
//     setCartItems((prev) =>
//       prev.map((i) =>
//         i.id === itemId
//           ? { ...i, quantity: Math.max(i.quantity + amount, 1) }
//           : i
//       )
//     );
//   };

//   return (
//     <BudgetContext.Provider
//       value={{
//         cartItems,
//         addToCart,
//         removeFromCart,
//         updateQuantity,
//         selectedDate,
//         setSelectedDate, // Expose selectedDate in context for access
//       }}
//     >
//       {children}
//     </BudgetContext.Provider>
//   );
// };

// export const useBudget = () => useContext(BudgetContext);

import React, { createContext, useContext, useState } from "react";

const BudgetContext = createContext();

export const BudgetProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [usualItems, setUsualItems] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // const addToCart = (item) => {
  //   setCartItems((prev) => {
  //     const existing = prev.find((i) => i.id === item.id);
  //     if (existing) {
  //       return prev.map((i) =>
  //         i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
  //       );
  //     }

  //     // ✅ Inject selectedDate when adding a new item
  //     return [
  //       ...prev,
  //       {
  //         ...item,
  //         quantity: 1,
  //         date: selectedDate, // 🔥 ensure every item gets a date
  //       },
  //     ];
  //   });
  // };


  // const addToCart = (item) => {
  //   const dateToUse = selectedDate || new Date().toISOString().split("T")[0];
  
  //   const existingItemIndex = cartItems.findIndex(
  //     (cartItem) => cartItem.id === item.id && cartItem.date === dateToUse
  //   );
  
  //   let updatedCart;
  
  //   if (existingItemIndex !== -1) {
  //     // If item for that date exists, increase quantity
  //     updatedCart = [...cartItems];
  //     updatedCart[existingItemIndex].quantity += 1;
  //   } else {
  //     // Add item with selected date
  //     updatedCart = [
  //       ...cartItems,
  //       {
  //         ...item,
  //         quantity: 1,
  //         date: dateToUse, // <- ✅ This is critical
  //       },
  //     ];
  //   }
  
  //   setCartItems(updatedCart);
  // };

  const addToCart = (item) => {
    console.log("Adding item to cart:", item); // Add this line to check
    const dateToUse = selectedDate || new Date().toISOString().split("T")[0];
  
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && cartItem.date === dateToUse
    );
  
    let updatedCart;
  
    if (existingItemIndex !== -1) {
      updatedCart = [...cartItems];
      updatedCart[existingItemIndex].quantity += 1;
    } else {
      updatedCart = [
        ...cartItems,
        {
          ...item,
          quantity: 1,
          date: dateToUse,
        },
      ];
    }
  
    setCartItems(updatedCart);
  };
  
  
  
  // const addToCart = (item) => {
  //   const itemDate = new Date(item.date);
    
  //   // Ensure the date is valid
  //   if (isNaN(itemDate.getTime())) {
  //     console.error("Invalid item date:", item.date); // Log invalid date
  //     item.date = ""; // Set to a valid default value or handle the error
  //   }
  
  //   setCartItems((prev) => {
  //     const existing = prev.find((i) => i.id === item.id);
  //     if (existing) {
  //       return prev.map((i) =>
  //         i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
  //       );
  //     }
  
  //     return [
  //       ...prev,
  //       {
  //         ...item,
  //         quantity: 1,
  //         date: item.date, // Use the valid date
  //       },
  //     ];
  //   });
  // };
  
  const removeFromCart = (item) => {
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
        selectedDate,
        setSelectedDate, // Expose selectedDate in context for access
        usualItems,
        setUsualItems,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

export const useBudget = () => useContext(BudgetContext);
