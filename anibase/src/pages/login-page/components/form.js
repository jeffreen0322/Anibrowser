import React from "react";
import axios from "axios";
import { useState } from "react";
import "./form.css";

export const Form = ({ label }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Keep existing form data
      [name]: value, // Update the changed field
    });
  };

  // Contacting the backend
  const handleAccountCreation = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add", {
        username: formData.username,
        password: formData.password,
      });
      console.log(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="form-container">
      <h1>{label}</h1>

      <form
        className="form"
        onSubmit={(e) => {
          if (label === "Sign Up") {
            handleAccountCreation();
          } else {
            console.log("Submit action is disabled for this label.");
          }
        }}
      >
        <label>Username</label>
        <input
          className="input-txt"
          placeholder="Enter Username"
          name="username"
          value={formData.username}
          onChange={handleChange}
        ></input>
        <label>Password</label>
        <input
          className="input-txt"
          placeholder="Enter Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>
        <input type="submit" value={label}></input>
      </form>
      {label === "Log in" ? (
        <div>
          <hr></hr>
          <div className="reg-recovery">
            <p>Forgot Password?</p>
            <p>Don't have an account? Register</p>
          </div>
        </div>
      ) : (
        <div>
          <hr></hr>
          <div className="reg-recovery">
            <p>Already have an account? Log in</p>
          </div>
        </div>
      )}
    </div>
  );
};
