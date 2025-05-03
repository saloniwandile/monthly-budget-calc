import React from "react";
import { useBudget } from "./BudgetContext";
import "./Cart.css";

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useBudget();

  const getTotalPrice = () =>
    (
      cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0
    ).toFixed(2);

  // Optional safeguard
  if (!Array.isArray(cartItems)) {
    return <p>Error: cartItems is not an array.</p>;
  }

  return (
    <div className="cart-page">
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <div className="cart-card" key={item.id}>
              {/* <img src={item.image} alt={item.name} className='cart-img' /> */}
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

                <p>${item.price.toFixed(2)}</p>
              </div>
              <div className="quantity">
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
              <button
                className="btn-remove"
                onClick={() => removeFromCart(item)}
              >
                Remove
              </button>
            </div>
          ))}
        </ul>
      )}
      <div className="cart-total">
        <h3>Total:{getTotalPrice()}</h3>
      </div>
    </div>
  );
};
