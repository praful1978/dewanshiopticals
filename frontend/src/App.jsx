import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "./api";

export default function App() {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    rightEye: { sph: "", cyl: "", axis: "", vn: "" },
    leftEye: { sph: "", cyl: "", axis: "", vn: "" },
    frame: "",
    lens: "",
    repairing: "",
  });

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const inputStyle = {
    padding: "10px",
    width: "100%",
    margin: "5px 0",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleEyeChange = (e, eye, field) => {
    setForm({
      ...form,
      [eye]: { ...form[eye], [field]: e.target.value }
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();

    fd.append("name", form.name);
    fd.append("mobile", form.mobile);

    // Eye data
    for (let key in form.rightEye) {
      fd.append(`rightEye[${key}]`, form.rightEye[key]);
    }
    for (let key in form.leftEye) {
      fd.append(`leftEye[${key}]`, form.leftEye[key]);
    }

    fd.append("frame", form.frame);
    fd.append("lens", form.lens);
    fd.append("repairing", form.repairing);

    if (file) fd.append("image", file);

    try {
      await axios.post(API_URL, fd, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      setMessage("Bill Saved Successfully!");
    } catch (err) {
      setMessage("Error: " + err.message);
    }
  };

  return (
    <div style={{ width: "400px", margin: "auto", marginTop: "20px" }}>
      <h2>Optical Bill Entry</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Customer Name"
          style={inputStyle}
          onChange={handleChange}
        />

        <input
          name="mobile"
          placeholder="Mobile"
          style={inputStyle}
          onChange={handleChange}
        />

        {/* Right Eye */}
        <h3>Right Eye</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "5px" }}>
          <input placeholder="SPH" style={inputStyle} onChange={(e) => handleEyeChange(e, "rightEye", "sph")} />
          <input placeholder="CYL" style={inputStyle} onChange={(e) => handleEyeChange(e, "rightEye", "cyl")} />
          <input placeholder="AXIS" style={inputStyle} onChange={(e) => handleEyeChange(e, "rightEye", "axis")} />
          <input placeholder="V/N" style={inputStyle} onChange={(e) => handleEyeChange(e, "rightEye", "vn")} />
        </div>

        {/* Left Eye */}
        <h3>Left Eye</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "5px" }}>
          <input placeholder="SPH" style={inputStyle} onChange={(e) => handleEyeChange(e, "leftEye", "sph")} />
          <input placeholder="CYL" style={inputStyle} onChange={(e) => handleEyeChange(e, "leftEye", "cyl")} />
          <input placeholder="AXIS" style={inputStyle} onChange={(e) => handleEyeChange(e, "leftEye", "axis")} />
          <input placeholder="V/N" style={inputStyle} onChange={(e) => handleEyeChange(e, "leftEye", "vn")} />
        </div>

        <input name="frame" placeholder="Frame" style={inputStyle} onChange={handleChange} />
        <input name="lens" placeholder="Lens" style={inputStyle} onChange={handleChange} />
        <input name="repairing" placeholder="Repairing" style={inputStyle} onChange={handleChange} />

        <label>Upload Image:</label>
        <input type="file" onChange={handleFileChange} />

        <button
          type="submit"
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            backgroundColor: "#1a73e8",
            color: "white",
            border: "none",
            borderRadius: "4px"
          }}
        >
          Save Bill
        </button>
      </form>

      <p style={{ textAlign: "center", marginTop: "10px" }}>{message}</p>
    </div>
  );
}
