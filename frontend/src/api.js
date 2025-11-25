import axios from "axios";

export const API_URL = "https://dewanshiopticals.vercel.app/api/bills";


axios.post(API_URL, formData)
  .then(res => console.log("Saved:", res.data))
  .catch(err => console.error(err));
