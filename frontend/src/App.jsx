// frontend/src/App.jsx
import React, { useEffect, useState } from "react";
import { getBills, createBill } from "./api";

function App() {
  const [bills, setBills] = useState([]);
  const [newBill, setNewBill] = useState({
    customerName: "",
    amount: "",
    date: "",
    description: "",
    photo: ""
  });

  // Fetch bills from backend
  useEffect(() => {
    const fetchBills = async () => {
      const data = await getBills();
      setBills(data);
    };
    fetchBills();
  }, []);

  // Handle form input change
  const handleChange = (e) => {
    setNewBill({ ...newBill, [e.target.name]: e.target.value });
  };

  // Submit new bill
  const handleSubmit = async (e) => {
    e.preventDefault();
    const created = await createBill(newBill);
    if (created) setBills([...bills, created]);
    setNewBill({ customerName: "", amount: "", date: "", description: "", photo: "" });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Bill App</h1>

      {/* New Bill Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={newBill.customerName}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={newBill.amount}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date"
          value={newBill.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          value={newBill.description}
          onChange={handleChange}
        />
        <input
          type="text"
          name="photo"
          placeholder="Photo URL"
          value={newBill.photo}
          onChange={handleChange}
        />
        <button type="submit">Add Bill</button>
      </form>

      {/* Bills List */}
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
            <p><strong>Name:</strong> {bill.customerName}</p>
            <p><strong>Amount:</strong> ₹{bill.amount}</p>
            <p><strong>Date:</strong> {bill.date ? new Date(bill.date).toLocaleDateString() : "N/A"}</p>
            <p><strong>Description:</strong> {bill.description || "N/A"}</p>
            {bill.photo && <img src={bill.photo} alt={bill.customerName} style={{ width: "100px", marginTop: "5px" }} />}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
