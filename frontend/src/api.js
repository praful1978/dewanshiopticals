// frontend/src/api.js
import axios from "axios";

// Backend API URL
const API_URL = import.meta.env.VITE_API_URL + "/api/bills";
// or hardcode for now:
// const API_URL = "https://dewanshiopticals-backend.onrender.com/api/bills";

export const getBills = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bills:", error);
    return [];
  }
};
