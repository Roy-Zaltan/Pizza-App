import React from "react";
import { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const IndiPizzaVeggiesComp = (props) => {
  const pizzaVeggiesObj = props.pizzaVeggiesItem;
  const setPizzaVeggiesArrFun = props.setPizzaVeggiesArr;
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    veggiesName: pizzaVeggiesObj.veggiesName || "",
    veggiesQuantity: pizzaVeggiesObj.veggiesQuantity || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const getPizzaVeggies = async () => {
    let url = "https://pizza-delivery-backend-i224.onrender.com/api/admin/manage-stocks/getpizzaveggies";
    const { status, data } = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("pizzza")}`,
      },
    });
    if (status === 200) {
      return data.PizzaVeggies;
    } else {
      console.log(data.error);
      return;
    }
  };
  const deletePizzaVeggies = async () => {
    try {
      const response = await axios.delete(
        `https://pizza-delivery-backend-i224.onrender.com/api/admin/manage-stocks/delete/pizzaveggies/${pizzaVeggiesObj._id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("pizzza")}`,
          },
        }
      );

      if (response.status === 200) {
        // Pizza base deleted successfully, you can perform any additional actions here
        console.log(response.status);
        let pizzaData = await getPizzaVeggies();
        setPizzaVeggiesArrFun(pizzaData);
      } else {
        Swal.fire("Error", "Failed to delete the pizza sauce", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire(
        "Error",
        "An error occurred while deleting the pizza sauce",
        "error"
      );
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const { status } = await axios.post(
      "https://pizza-delivery-backend-i224.onrender.com/api/admin/manage-stocks/update/pizzaveggies/" +
        pizzaVeggiesObj._id,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("pizzza")}`,
        },
      }
    );
    if (status === 200) {
      const response = await getPizzaVeggies();
      setPizzaVeggiesArrFun(response);
    } else {
      Swal.fire("Something went Wrong", "", "error");
      return;
    }
    setEditing(!editing);
  };
  return (
    <>
      {editing === false ? (
        <div className="card" style={{ maxWidth: "15rem", margin: "10px" }}>
          <div className="card-header">{pizzaVeggiesObj.veggiesName}</div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              Pizza Veggies Quantity(gm):{pizzaVeggiesObj.veggiesQuantity}
            </li>
            <li className="list-group-item">
              <button
                className="btn btn-primary me-2 ms-2 btn-sm"
                // onClick={handleEditClick}
                onClick={() => {
                  setEditing(!editing);
                }}
              >
                <i className="bi bi-pencil-fill"></i>
              </button>
              <button
                className="btn btn-danger me-2 ms-2 btn-sm"
                onClick={deletePizzaVeggies}
              >
                <i className="bi bi-trash-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3 input-group">
            <span
              className="input-group-text form-background"
              id="basic-addon1"
            >
              Veggies Name
            </span>
            <input
              type="text"
              className="form-control"
              id="veggiesName"
              name="veggiesName"
              value={formData.veggiesName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3 input-group">
            <span
              className="input-group-text form-background"
              id="basic-addon1"
            >
              Veggies Quantity(gm)
            </span>
            <input
              type="number"
              className="form-control"
              id="veggiesQuantity"
              name="veggiesQuantity"
              value={formData.veggiesQuantity}
              onChange={handleChange}
              required
            />
          </div>
          <button className="btn btn-success btn-sm" type="submit">
            <i className="bi bi-check2"></i>
          </button>
        </form>
      )}
    </>
  );
};

export default IndiPizzaVeggiesComp;
