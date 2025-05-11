import React from "react";
import "./StoreCarousel.css";

export const StoreCarousel = ({ store, items, onAdd }) => {
  return (
    <div className="store-carousel">
      <div className="carousel-items">
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.image} alt={item.name} className="card-img" />
            <p className="item-name">{item.name}</p>
            <p className="item-price">${item.price.toFixed(2)}</p>
            <button className="btn-card" onClick={() => onAdd(item)}>
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
