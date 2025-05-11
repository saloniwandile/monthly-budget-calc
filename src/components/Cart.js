import React, { useState } from "react";
import { useBudget } from "./BudgetContext";
import sortIcon from "../images/sort.png";
import "./Cart.css";

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useBudget();
  const [localDateFilter, setLocalDateFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("grouped");

  // Function to send cart items to the server
  const saveCartItemsToExcel = async () => {
    try {
      console.log("Sending cart items to server:", cartItems);
      const response = await fetch("http://localhost:3001/add-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cartItems: cartItems }),
      });

      if (response.ok) {
        alert("Items saved to Excel successfully!");
      } else {
        alert("Failed to save items to Excel.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred while saving items.");
    }
  };


  // Sort cartItems by date to show the most recent first
  const sortedCartItems = [...cartItems].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  // Group items by date
  const grouped = sortedCartItems.reduce((acc, item) => {
    const key = item.date || "No Date";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  // Filter items based on the selected date
  const itemsToDisplay =
    viewMode === "grouped"
      ? grouped
      : sortedCartItems.filter((item) => item.date === localDateFilter);

  // Get total price of cart items
  const getTotalPrice = () => {
    return sortedCartItems
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const CartItem = ({ item }) => (
    <div className="cart-card">
      <div className="item-details">
        <h3>
          {item.name}
          <span>
            <button
              className={`store-name-${item.store
                ?.toLowerCase()
                .replace(/\s+/g, "-")}`}
            >
              {item.store}
            </button>
          </span>
        </h3>
      </div>
      <div className="quantity">
        <p className="cart-price">${item.price.toFixed(2)}</p>
        <button
          className="btn-quantity"
          onClick={() => updateQuantity(item.id, -1)}
        >
          -
        </button>
        <h6 className="quantity">{item.quantity}</h6>
        <button
          className="btn-quantity"
          onClick={() => updateQuantity(item.id, 1)}
        >
          +
        </button>
      </div>
      <button className="btn-remove" onClick={() => removeFromCart(item)}>
        Remove
      </button>
    </div>
  );

  return (
    <div className="cart-page">
      {/* <h2>Cart</h2> */}

      <div className="view-toggle">
  <div className="cart-left">
    <h2>Cart</h2>
  </div>
  <div className="cart-right">
    <input
      type="date"
      className="excel-btn"
      value={localDateFilter}
      onChange={(e) => {
        setLocalDateFilter(e.target.value);
        setViewMode("selected");
      }}
    />
    <img
      src={sortIcon}
      alt="sort"
      className="sort-items"
      onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
    />
    <button className="excel-btn" onClick={saveCartItemsToExcel}>Save Cart to Excel</button>
    {viewMode === "selected" && (
      <button
        className="btn-card"
        onClick={() => {
          setViewMode("grouped");
          setLocalDateFilter("");
        }}
      >
        Clear Filter
      </button>
    )}
  </div>
</div>


      {/* Cart items rendering */}
      {viewMode === "selected" ? (
        itemsToDisplay.length === 0 ? (
          <p>No items for selected date.</p>
        ) : (
          itemsToDisplay.map((item) => (
            <CartItem key={`${item.id}-${item.date}`} item={item} />
          ))
        )
      ) : (
        Object.entries(grouped).map(([date, items]) => (
          <div className="cart-card-date" key={date}>
            <h4 >{date}</h4>
            {items.map((item) => (
              <CartItem key={`${item.id}-${item.date}`} item={item} />
            ))}
          </div>
        ))
      )}

      <div className="cart-total">
        <h3>Total: ${getTotalPrice()}</h3>
      </div>
    </div>
  );
};
