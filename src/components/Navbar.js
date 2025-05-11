import React, { useRef } from "react";
import "./Navbar.css";
import cartIcon from "../images/shopping-cart.png";
import homeIcon from "../images/home-icon.png";
import calendar from "../images/calendar.png";
import { Link } from "react-router-dom";
import { useBudget } from "./BudgetContext"; // ✅ correct import

export const Navbar = () => {
  const { cartItems, selectedDate, setSelectedDate } = useBudget(); // ✅ use global date state
  const dateInputRef = useRef(null);

  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleIconClick = () => {
    dateInputRef.current.showPicker(); // 📅 opens native date picker
  };

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value); // ✅ store in YYYY-MM-DD format (for logic)
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return "";
    const [year, month, day] = isoDate.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <nav className="navbar">
      <div className="navbar-right">
        <Link to="/" className="cart-icon">
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
          value={selectedDate} // ✅ bind input to global state
        />
        {selectedDate && <span className="selected-date">{formatDate(selectedDate)}</span>}
      </div>

      <div className="navbar-right">
        <Link to="/cart" className="cart-icon">
          <img src={cartIcon} alt="cart" />
          {totalQuantity > 0 && (
            <span className="cart-count">{totalQuantity}</span>
          )}
        </Link>
      </div>
    </nav>
  );
};
