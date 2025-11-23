// frontend/src/App.jsx
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
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Bills List</h1>
      {bills.length === 0 && <p>No bills found.</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {bills.map((bill) => (
          <li
            key={bill._id}
            style={{
              border: "1px solid #ccc",
              marginBottom: "10px",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <p><strong>Name:</strong> {bill.name}</p>
            <p><strong>Amount:</strong> ₹{bill.amount}</p>
            <p>
              <strong>Date:</strong>{" "}
              {bill.date ? new Date(bill.date).toLocaleDateString() : "N/A"}
            </p>
            <p><strong>Description:</strong> {bill.description || "N/A"}</p>
            {bill.photo && (
              <img
                src={bill.photo}
                alt={bill.name}
                style={{ width: "100px", marginTop: "5px" }}
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
