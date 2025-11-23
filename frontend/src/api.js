import axios from "axios";

const API_URL = "https://dewanshiopticals-backend.onrender.com/api/bills";

export const getBills = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching bills:", error);
    return [];
  }
};
