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

import React from "react";
import "./Navbar.css";
import cartIcon from "../images/shopping-cart.png";
import homeIcon from "../images/home-icon.png"
import { Link } from "react-router-dom";
import { useBudget } from "./BudgetContext";

export const Navbar = () => {
  const { cartItems } = useBudget();
  const totalQuantity = cartItems.reduce((acc, item) => acc + item.quantity, 0);

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
