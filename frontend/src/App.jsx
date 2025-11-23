import React, { useEffect, useState } from "react";
import { getBills } from "./api";

function App() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    const fetchBills = async () => {
      const data = await getBills();
      setBills(data);
    };
    fetchBills();
  }, []);

  return (
    <div>
      <h1>Bills List</h1>
      <ul>
        {bills.map((bill) => (
          <li key={bill._id}>
            {bill.name} - {bill.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
