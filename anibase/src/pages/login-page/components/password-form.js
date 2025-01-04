import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";

export const PasswordForm = ({ label, encrypted, iv }) => {
  const SERVER = "https://anibrowser-server.vercel.app";
  const [formData, setFormData] = useState({
    password: "",
    passwordRetype: "",
  });

  const swap = useNavigate();
  const changeForm = () => {
    swap("/login", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Keep existing form data
      [name]: value, // Update the changed field
    });
  };

  // Contacting the backend
  const handlePasswordChange = async () => {
    try {
      if (formData.password.length > 0 && formData.passwordRetype.length > 0) {
        if (formData.password === formData.passwordRetype) {
          await axios.post(`${SERVER}/password-reset`, {
            email: encrypted,
            iv: iv,
            password: formData.password,
          });

          changeForm();
        } else {
          alert("Passwords don't match!");
        }
      } else {
        alert("Please fill in all fields!");
      }
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
          e.preventDefault();
          handlePasswordChange();
        }}
      >
        <label>New password</label>
        <input
          className="input-txt"
          placeholder="Enter password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        ></input>

        <label>Confirm password</label>
        <input
          className="input-txt"
          placeholder="Re-enter password"
          name="passwordRetype"
          value={formData.passwordRetype}
          onChange={handleChange}
        ></input>

        <input className="input-submit" type="submit" value={label}></input>
      </form>
    </div>
  );
};
