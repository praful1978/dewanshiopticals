// frontend/src/api.js
import axios from "axios";

// Backend API URL (Render deployment)
const API_URL = import.meta.env.VITE_API_URL + "/api/bills";
// Or hardcode for testing:
// const API_URL = "https://dewanshiopticals-backend.onrender.com/api/bills"

export const getBills = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bills:", error);
    return [];
  }
};

export const createBill = async (billData) => {
  try {
    const response = await axios.post(API_URL, billData);
    return response.data;
  } catch (error) {
    console.error("Error creating bill:", error);
    return null;
  }
};
