import React from "react";
import "./inventory.styles.css";
import { Link } from "react-router-dom";
const Inventory = () => {
  return (
    <div className="inventory-container">
      <div className="container text-center">
        <div className="row ">
          <div className="col-sm indi-box"><Link to="/">Manage Order</Link></div>
          <div className="col-sm indi-box"><Link to="/users/inventory/manage-stocks">Manage Stocks</Link></div>
          <div className="col-sm indi-box"><Link to="/">Manage Pizzas</Link></div>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
