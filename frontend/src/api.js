// frontend/src/api.js
import axios from "axios";

// Backend URL from Render
const API_URL = "https://dewanshiopticals-mq36.onrender.com/api/bills";

// Function to get all bills
export const getBills = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bills:", error);
    return [];
  }
};
