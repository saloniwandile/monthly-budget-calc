import React, { useState, useRef } from "react";
import itemsData from "../data/data.json";
import { useBudget } from "./BudgetContext";
import { CustomItemForm } from "./CustomItemForm";
import { StoreCarousel } from "./StoreCarousel";

const getImage = (filename) => require(`../images/${filename}`);

const generateRandomId = () => {
  return `${Math.floor(Math.random() * 1000000)}-${Date.now()}`;
};
// export const BudgetCard = () => {
//   const scrollRef = useRef(null);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [items, setItems] = useState(
//     itemsData.map((item) => ({
//       ...item,
//       image: getImage(item.image),
//       isUsual: item.isUsual || false,
//     }))
//   );

//   const [customItem, setCustomItem] = useState({
//     name: "",
//     price: "",
//     image: "",
//     color: "#e080c6",
//     date: new Date().toISOString().split("T")[0],
//     store: "",
//     customStore: "",
//     isUsual: false,
//   });

//   console.log(customItem)

//   const { addToCart } = useBudget();

//   // const handleInputChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setCustomItem((prev) => ({ ...prev, [name]: value }));
//   // };

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     // If it's a checkbox, set the state using `checked`, otherwise use `value`
//     setCustomItem((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const scrollDirection = (dir) => {
//     const scrollAmount = 300;
//     if (!scrollRef.current) return;

//     scrollRef.current.scrollBy({
//       left: dir === "left" ? -scrollAmount : scrollAmount,
//       behavior: "auto",
//     });
//   };

//   const handleAddCustomItem = () => {
//     if (!customItem.name || !customItem.price) return;

//     const storename =
//       customItem.store === "Custom" ? customItem.customStore : customItem.store;

//     const newItem = {
//       id: generateRandomId(),
//       name: customItem.name,
//       price: parseFloat(customItem.price),
//       store: storename,
//       image: customItem.image || "tomatoes.png",
//       quantity: 0,
//       color: customItem.color || "#e080c6",
//       date: new Date().toISOString().split("T")[0],
//     };

//     addToCart(newItem);

//     setCustomItem({
//       name: "",
//       price: "",
//       store: "",
//       color: "#e080c6",
//       customStore: "",
//       date: selectedDate,
//     });
//   };

//   // ✅ Group items by store here, outside the render/JSX
//   const groupedItems = items.reduce((acc, item) => {
//     const store = item.store || "Other";
//     if (!acc[store]) acc[store] = [];
//     acc[store].push(item);
//     return acc;
//   }, {});

//   const usualItems = items.filter((item) => item.isUsual);

//   return (
//     <div className="page">
//       <CustomItemForm
//         customItem={customItem}
//         handleInputChange={handleInputChange}
//         handleAdd={handleAddCustomItem}
//       />
//       {Object.entries(groupedItems).map(([store, storeItems]) => (
//         <div key={store} className="store-carousel-section">
//           <h5 className="store-title">
//             Your{" "}
//             {store.charAt(0).toUpperCase() + store.slice(1).replace("-", " ")}{" "}
//             usuals
//           </h5>
//           <StoreCarousel
//             store={store}
//             items={storeItems}
//             onAdd={(item) => addToCart({ ...item, date: selectedDate })}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// // export const BudgetCard = () => {
// //   const { addToCart } = useBudget();
// //   const [activeTab, setActiveTab] = useState("usuals"); // "usuals" | "add"
// //   const [customItem, setCustomItem] = useState({
// //     name: "",
// //     price: "",
// //     image: "",
// //     color: "#e080c6",
// //     store: "",
// //     customStore: "",
// //   });

// //   const items = itemsData.map((item) => ({
// //     ...item,
// //     image: getImage(item.image),
// //   }));

// //   const groupedItems = items.reduce((acc, item) => {
// //     const store = item.store || "Other";
// //     if (!acc[store]) acc[store] = [];
// //     acc[store].push(item);
// //     return acc;
// //   }, {});

// //   const handleInputChange = (e) => {
// //     const { name, value } = e.target;
// //     setCustomItem((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleAddCustomItem = () => {
// //     if (!customItem.name || !customItem.price) return;
// //     const storename =
// //       customItem.store === "Custom" ? customItem.customStore : customItem.store;

// //     const newItem = {
// //       id: generateRandomId(),
// //       name: customItem.name,
// //       price: parseFloat(customItem.price),
// //       store: storename,
// //       image: customItem.image || "tomatoes.png",
// //       quantity: 0,
// //       color: customItem.color || "#e080c6",
// //     };

// //     addToCart(newItem);
// //     setCustomItem({ name: "", price: "", store: "", color: "#e080c6", customStore: "" });
// //   };

// //   return (
// //     <div className="budget-card-page">
// //       {/* Tab Switch */}
// //       <div className="tabs">
// //         <button
// //           className={`tab ${activeTab === "usuals" ? "active" : ""}`}
// //           onClick={() => setActiveTab("usuals")}
// //         >
// //           🛒 Usual Items
// //         </button>
// //         <button
// //           className={`tab ${activeTab === "add" ? "active" : ""}`}
// //           onClick={() => setActiveTab("add")}
// //         >
// //           ➕ Add Custom Item
// //         </button>
// //       </div>

// //       {/* Content */}
// //       <div className="tab-content">
// //         {activeTab === "add" ? (
// //           <CustomItemForm
// //             customItem={customItem}
// //             handleInputChange={handleInputChange}
// //             handleAdd={handleAddCustomItem}
// //           />
// //         ) : (
// //           <>
// //             <h4 className="font-h4">Your Usuals</h4>
// //             {Object.entries(groupedItems).map(([store, storeItems]) => (
// //               <div key={store} className="store-carousel-section">
// //                 <h5 className="store-title">{store}</h5>
// //                 <div className="carousel-container horizontal-scroll">
// //                   {storeItems.map((item) => (
// //                     <div className="card" key={item.id}>
// //                       <h3>{item.name}</h3>
// //                       <img
// //                         src={item.image}
// //                         alt={item.name}
// //                         className="card-img"
// //                       />
// //                       <p className="price">${item.price}</p>
// //                       <button className="btn-card" onClick={() => addToCart(item)}>
// //                         Add
// //                       </button>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             ))}
// //           </>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };


// export const BudgetCard = () => {
//   const scrollRef = useRef(null);
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0]
//   );
//   const [items, setItems] = useState(
//     itemsData.map((item) => ({
//       ...item,
//       image: getImage(item.image),
//       isUsual: item.isUsual || false,
//     }))
//   );

//   const [customItem, setCustomItem] = useState({
//     name: "",
//     price: "",
//     image: "",
//     color: "#e080c6",
//     date: new Date().toISOString().split("T")[0],
//     store: "",
//     customStore: "",
//     isUsual: false,
//   });

//   const { addToCart } = useBudget();

//   const handleInputChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setCustomItem((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleAddCustomItem = () => {
//     if (!customItem.name || !customItem.price) return;

//     const storename =
//       customItem.store === "Custom" ? customItem.customStore : customItem.store;

//     const newItem = {
//       id: generateRandomId(),
//       name: customItem.name,
//       price: parseFloat(customItem.price),
//       store: storename,
//       image: customItem.image || "tomatoes.png",
//       quantity: 0,
//       color: customItem.color || "#e080c6",
//       date: new Date().toISOString().split("T")[0],
//       isUsual: customItem.isUsual, // Ensure 'isUsual' is set for custom items
//     };

//     addToCart(newItem);

//     setCustomItem({
//       name: "",
//       price: "",
//       store: "",
//       color: "#e080c6",
//       customStore: "",
//       date: selectedDate,
//     });
//   };

//   // ✅ Group items by store
//   const groupedItems = items.reduce((acc, item) => {
//     const store = item.store || "Other";
//     if (!acc[store]) acc[store] = [];
//     acc[store].push(item);
//     return acc;
//   }, {});

//   const usualItems = items.filter((item) => item.isUsual);

//   return (
//     <div className="page">
//       {/* Custom Item Form */}
//       <CustomItemForm
//         customItem={customItem}
//         handleInputChange={handleInputChange}
//         handleAdd={handleAddCustomItem}
//       />

      

//       {/* Display Usual Items */}
//       {usualItems.length > 0 && (
//         <div className="store-carousel-section">
//           <h5 className="store-title">Your Usuals</h5>
//           <StoreCarousel
//             store="Usuals"
//             items={usualItems}
//             onAdd={(item) => addToCart({ ...item, date: selectedDate })}
//           />
//         </div>
//       )}

//       {/* Display Grouped Items by Store */}
//       {Object.entries(groupedItems).map(([store, storeItems]) => (
//         <div key={store} className="store-carousel-section">
//           <h5 className="store-title">
//             Your{" "}
//             {store.charAt(0).toUpperCase() + store.slice(1).replace("-", " ")}
//           </h5>
//           <StoreCarousel
//             store={store}
//             items={storeItems}
//             onAdd={(item) => addToCart({ ...item, date: selectedDate })}
//           />
//         </div>
//       ))}
//     </div>
//   );
// };


export const BudgetCard = () => {
  const scrollRef = useRef(null);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [items, setItems] = useState(
    itemsData.map((item) => ({
      ...item,
      image: getImage(item.image),
      isUsual: item.isUsual || false,
    }))
  );

  const [customItem, setCustomItem] = useState({
    name: "",
    price: "",
    image: "",
    color: "#e080c6",
    date: new Date().toISOString().split("T")[0],
    store: "",
    customStore: "",
    isUsual: false,
  });

  const { addToCart } = useBudget();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleAddCustomItem = () => {
    if (!customItem.name || !customItem.price) return;

    const storename =
      customItem.store === "Custom" ? customItem.customStore : customItem.store;

    const newItem = {
      id: generateRandomId(),
      name: customItem.name,
      price: parseFloat(customItem.price),
      store: storename,
      image: customItem.image || "tomatoes.png",
      quantity: 0,
      color: customItem.color || "#e080c6",
      date: new Date().toISOString().split("T")[0],
      isUsual: customItem.isUsual, // Ensure 'isUsual' is set for custom items
    };

    // addToCart(newItem);
    addToCart(newItem);
setItems((prev) => [...prev, newItem]); 

    setCustomItem({
      name: "",
      price: "",
      store: "",
      color: "#e080c6",
      customStore: "",
      date: selectedDate,
      isUsual: false,
    });
  };

  // ✅ Group items by store
  const groupedItems = items.reduce((acc, item) => {
    const store = item.store || "Other";
    if (!acc[store]) acc[store] = [];
    acc[store].push(item);
    return acc;
  }, {});

  const usualItems = items.filter((item) => item.isUsual);;

  return (
    <div className="page">
      {/* Custom Item Form */}
      <CustomItemForm
        customItem={customItem}
        handleInputChange={handleInputChange}
        handleAdd={handleAddCustomItem}
      />

      {/* Display Usual Items
      {usualItems.length > 0 && (
        <div className="store-carousel-section">
          <h5 className="store-title">Your Usuals</h5>
          <StoreCarousel
            store="Usuals"
            items={usualItems}
            onAdd={(item) => addToCart({ ...item, date: selectedDate })}
          />
        </div>
      )} */}

      {/* Display Grouped Items by Store */}
      {Object.entries(groupedItems).map(([store, storeItems]) => (
        <div key={store} className="store-carousel-section">
          <h5 className="store-title">
            Your{" "}
            {store.charAt(0).toUpperCase() + store.slice(1).replace("-", " ")}
          </h5>
          <StoreCarousel
            store={store}
            items={storeItems}
            onAdd={(item) => addToCart({ ...item, date: selectedDate })}
          />
        </div>
      ))}
    </div>
  );
};
