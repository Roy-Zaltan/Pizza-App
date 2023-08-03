// api.js
import axios from "axios";

export const getUser = async () => {
  try {
    const { data } = await axios.get("https://pizza-delivery-backend-i224.onrender.com/api/users/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("pizzza")}`,
      },
    });
    return data.user;
  } catch (error) {
    return null;
  }
};
