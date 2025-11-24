import axios from "axios";

const API_URL = "https://dewanshiopticals-mq36.onrender.com";

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
