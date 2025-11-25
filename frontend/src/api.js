const API_URL = "https://dewanshiopticals-8acwifjl5-prafulla-kinkars-projects.vercel.app/api/bills";

axios.post(API_URL, formData)
  .then(res => console.log(res.data))
  .catch(err => console.error(err));
