// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import "./App.css";
// import { BudgetCard } from "./components/budgetCard";
// import { Navbar } from "./components/Navbar";
// import { BudgetProvider } from "./components/BudgetContext";
// import { Cart } from "./components/Cart";
// import "bootstrap/dist/css/bootstrap.min.css";

// function App() {
//   return (
//     <div className="App">

//       <BudgetProvider>
//         <Router>
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<BudgetCard />} />
//             <Route path="/cart" element={<Cart />} />
//           </Routes>
//         </Router>
//       </BudgetProvider>
//     </div>
//   );
// }

// export default App;

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { BudgetCard } from "./components/budgetCard";
import { Navbar } from "./components/Navbar";
import { BudgetProvider } from "./components/BudgetContext";
import { Cart } from "./components/Cart";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <BudgetProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<BudgetCard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Router>
      </BudgetProvider>
    </div>
  );
}

export default App;
