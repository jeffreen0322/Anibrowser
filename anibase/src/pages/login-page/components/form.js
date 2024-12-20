import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../components/authentication/auth-context";
import "./form.css";

export const Form = ({ label }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData, // Keep existing form data
      [name]: value, // Update the changed field
    });
  };

  const directRegister = () => {
    window.location.href = "/signup";
  };

  const directLogin = () => {
    window.location.href = "/login";
  };

  // Contacting the backend
  const handleAccountCreation = async () => {
    try {
      const response = await axios.post("http://localhost:5000/add", {
        username: formData.username,
        password: formData.password,
      });

      window.location.href = "/login";
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e) => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username: formData.username,
        password: formData.password,
      });

      if (Object.keys(response.data).length !== 0) {
        if (
          response.data.username === formData.username &&
          response.data.password === formData.password
        ) {
          login(formData.username);
          window.location.href = "/";
        } else {
          alert("Username or password is incorrect.");
        }
      } else {
        alert("Please insert a valid username and password.");
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
          if (label === "Sign Up") {
            handleAccountCreation();
          } else {
            handleLogin();
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
        <input className="input-submit" type="submit" value={label}></input>
      </form>
      {label === "Log in" ? (
        <div>
          <hr></hr>
          <div className="reg-recovery">
            <p className="lost-pw">Forgot Password?</p>
            <p>
              Don't have an account? {""}
              <span className="alt" onClick={directRegister}>
                Register
              </span>
            </p>
          </div>
        </div>
      ) : (
        <div>
          <hr></hr>
          <div className="reg-recovery">
            <p>
              Already have an account?{" "}
              <span className="alt" onClick={directLogin}>
                Log in
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
