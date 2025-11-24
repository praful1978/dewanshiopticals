// BillForm.jsx

import React, { useState } from "react";
import axios from "axios";

// Define a reusable style for inputs for visibility
const inputStyle = {
  padding: "8px",
  margin: "5px 0",
  border: "1px solid #ccc",
  borderRadius: "4px",
  width: "100%", // Full width inside their container
  boxSizing: "border-box" // Include padding and border in the element's total width and height
};

export default function BillForm() {
  const [formDataState, setFormDataState] = useState({
    name: "",
    mobile: "",
    rightEye: { sph: "", cyl: "", axis: "", vn: "" },
    leftEye: { sph: "", cyl: "", axis: "", vn: "" },
    frame: "",
    lens: "",
    repairing: "",
  });

  const [billImage, setBillImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handle normal text inputs
  const handleChange = (e) => {
    setFormDataState({ ...formDataState, [e.target.name]: e.target.value });
  };

  // Handle nested eye input fields
  const handleEyeChange = (e, eye, field) => {
    setFormDataState({
      ...formDataState,
      [eye]: { ...formDataState[eye], [field]: e.target.value },
    });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setBillImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    // Append main fields
    formData.append("name", formDataState.name);
    formData.append("mobile", formDataState.mobile);
    formData.append("frame", formDataState.frame);
    formData.append("lens", formDataState.lens);
    formData.append("repairing", formDataState.repairing);

    // Use FLAT KEYS for reliable multer parsing (Required for data saving)
    formData.append("rightEye_sph", formDataState.rightEye.sph);
    formData.append("rightEye_cyl", formDataState.rightEye.cyl);
    formData.append("rightEye_axis", formDataState.rightEye.axis);
    formData.append("rightEye_vn", formDataState.rightEye.vn);

    formData.append("leftEye_sph", formDataState.leftEye.sph);
    formData.append("leftEye_cyl", formDataState.leftEye.cyl);
    formData.append("leftEye_axis", formDataState.leftEye.axis);
    formData.append("leftEye_vn", formDataState.leftEye.vn);

    // Append image
    if (billImage) {
      formData.append("billImage", billImage);
    }

    try {
      // CRITICAL FIX: Changed endpoint to /api/bills (plural)
      const res = await axios.post("https://dewanshiopticals-mq36.onrender.com", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setMessage("✔ Bill saved successfully! congrats");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setMessage("❌ Error saving bill");
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto", border: "1px solid #eee", borderRadius: "8px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Add New Bill</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="name"
          placeholder="Customer Name"
          onChange={handleChange}
          style={inputStyle} // ⭐️ Added style
        />

        <input
          type="text"
          name="mobile"
          placeholder="Mobile"
          onChange={handleChange}
          style={inputStyle} // ⭐️ Added style
        />

        <h3 style={{ marginTop: "15px" }}>Right Eye</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          <input placeholder="SPH" onChange={(e) => handleEyeChange(e, "rightEye", "sph")} style={inputStyle} />
          <input placeholder="CYL" onChange={(e) => handleEyeChange(e, "rightEye", "cyl")} style={inputStyle} />
          <input placeholder="AXIS" onChange={(e) => handleEyeChange(e, "rightEye", "axis")} style={inputStyle} />
          <input placeholder="VN" onChange={(e) => handleEyeChange(e, "rightEye", "vn")} style={inputStyle} />
        </div>

        <h3 style={{ marginTop: "15px" }}>Left Eye</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
          <input placeholder="SPH" onChange={(e) => handleEyeChange(e, "leftEye", "sph")} style={inputStyle} />
          <input placeholder="CYL" onChange={(e) => handleEyeChange(e, "leftEye", "cyl")} style={inputStyle} />
          <input placeholder="AXIS" onChange={(e) => handleEyeChange(e, "leftEye", "axis")} style={inputStyle} />
          <input placeholder="VN" onChange={(e) => handleEyeChange(e, "leftEye", "vn")} style={inputStyle} />
        </div>

        <input
          type="text"
          name="frame"
          placeholder="Frame Details"
          onChange={handleChange}
          style={inputStyle} // ⭐️ Added style
        />

        <input
          type="text"
          name="lens"
          placeholder="Lens Details"
          onChange={handleChange}
          style={inputStyle} // ⭐️ Added style
        />

        <input
          type="text"
          name="repairing"
          placeholder="Repairing Work"
          onChange={handleChange}
          style={inputStyle} // ⭐️ Added style
        />

        <div style={{ marginTop: "15px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Upload Image:</label>
          <input type="file" onChange={handleFileChange} />
        </div>

        <button 
          type="submit" 
          style={{ 
            marginTop: "20px", 
            padding: "10px 15px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "4px", 
            cursor: "pointer", 
            width: "100%" 
          }}
        >
          Save Bill
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "15px", fontWeight: "bold" }}>{message}</p>
    </div>
  );
}