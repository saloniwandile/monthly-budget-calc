// import React from 'react';
// import './Navbar.css';
// import cartIcon from '../images/shopping-cart.png';

// import { useBudget } from './BudgetContext';

// export const Navbar = () => {

//     const { cartItems } = useBudget();

//   return (
//     <nav className="navbar">
//       <div className="navbar-center">
//         <ul className="nav-links">
//           <h3>Monthly Budget Calculator</h3>
//         </ul>
//       </div>
//       <div className="navbar-right">
//         <a href="/cart" className="cart-icon">
//           <img src={cartIcon} alt="cart" />
//           <span className="cart-count">{cartItems.length}</span>
//         </a>
//       </div>
//     </nav>
//   );
// };

import React, { useState, useRef } from "react";
import "./Navbar.css";
import cartIcon from "../images/shopping-cart.png";
import homeIcon from "../images/home-icon.png";
import calendar from "../images/calendar.png";
import { Link } from "react-router-dom";
import { useBudget } from "./BudgetContext";

export const Navbar = () => {
  const { cartItems } = useBudget();
  const [selectedDate, setSelectedDate] = useState("");
  const dateInputRef = useRef(null);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleIconClick = () => {
    dateInputRef.current.showPicker(); // Opens native date picker
  };

  const handleDateChange = (e) => {
    const [year, month, day] = e.target.value.split("-");
    setSelectedDate(`${day}-${month}-${year}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-right">
        <Link to="/home" className="cart-icon">
          <img src={homeIcon} alt="home" />
        </Link>
      </div>
      <div className="navbar-center">
        <ul className="nav-links">
          <h3>Monthly Budget Calculator</h3>
        </ul>
      </div>
      <div className="navbar-right cart-icon calendar-container">
        <img
          src={calendar}
          alt="calendar"
          onClick={handleIconClick}
          className="calendar-icon"
          style={{ cursor: "pointer" }}
        />
        <input
          type="date"
          onChange={handleDateChange}
          ref={dateInputRef}
          className="hidden-date-picker"
        />
        {selectedDate && <span className="selected-date">{selectedDate}</span>}
      </div>
      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          <img src={cartIcon} alt="cart" />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span> // 🔢 Show total quantity
          )}
        </Link>
      </div>
    </nav>
  );
};
