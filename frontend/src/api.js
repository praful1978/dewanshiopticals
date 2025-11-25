import axios from "axios";

const API_URL = "https://dewanshiopticals-av40jxthv-prafulla-kinkars-projects.vercel.app/bills";

axios.post(API_URL, formData)
  .then(res => console.log("Saved:", res.data))
  .catch(err => console.error(err));
