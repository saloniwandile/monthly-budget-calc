import React, { useState, useRef } from "react";
import itemsData from "../data/data.json";
import { useBudget } from "./BudgetContext";
import { CustomItemForm } from "./CustomItemForm";
import { StoreCarousel } from "./StoreCarousel";

const getImage = (filename) => require(`../images/${filename}`);

const generateRandomId = () => {
  return `${Math.floor(Math.random() * 1000000)}-${Date.now()}`;
};


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
      <CustomItemForm
        customItem={customItem}
        handleInputChange={handleInputChange}
        handleAdd={handleAddCustomItem}
      />
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
