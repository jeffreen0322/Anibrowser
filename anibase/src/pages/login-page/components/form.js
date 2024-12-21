import React from "react";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../../components/authentication/auth-context";
import { useNavigate } from "react-router-dom";
import "./form.css";

export const Form = ({ label }) => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const swap = useNavigate();
  const changeForm = () => {
    swap(`${label === "Log In" ? "/signup" : "/login"}`, { replace: true });
  };

  const redirectPasswordChange = () => {
    swap("/reset/password", { replace: true });
  };

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
      const address = await axios.post("http://localhost:5000/validate-email", {
        address: formData.email,
      });

      const user = await axios.post("http://localhost:5000/validate-username", {
        user: formData.username,
      });

      const emailValid = address.data.length < 1 ? true : false;
      const userValid = user.data.length < 1 ? true : false;

      if (
        emailValid &&
        userValid &&
        formData.email.length > 0 &&
        formData.password.length > 0 &&
        formData.username.length > 0
      ) {
        await axios.post("http://localhost:5000/add", {
          email: formData.email,
          username: formData.username,
          password: formData.password,
        });

        changeForm();
      } else {
        if (
          formData.email.length === 0 ||
          formData.username.length === 0 ||
          formData.password.length === 0
        ) {
          alert("Please fill in all fields!");
        } else if (!emailValid && !userValid) {
          alert("Email and username already taken");
        } else if (!emailValid && userValid) {
          alert("Email already taken");
        } else {
          alert("Username already taken");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      if (Object.keys(response.data).length !== 0) {
        if (
          response.data.username === formData.username &&
          response.data.password === formData.password
        ) {
          login(response.data.username, response.data.email);
          swap("/", { replace: true });
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

  const sendEmail = async () => {
    try {
      const response = await axios.post("http://localhost:5000/confirm-email", {
        email: formData.email,
      });

      if (Object.keys(response.data).length !== 0) {
        if (response.data.email === formData.email) {
          await axios.post("http://localhost:5000/send-email-password", {
            email: formData.email,
          });
        } else {
          alert("No account with provided email found");
        }
      } else {
        alert("Please provide an email address");
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
          } else if (label === "Log In") {
            handleLogin();
          } else {
            sendEmail();
          }
        }}
      >
        {label === "Sign Up" ? (
          <>
            <label>Email</label>
            <input
              className="input-txt"
              placeholder="Enter email address"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </>
        ) : null}

        {label !== "Reset Password" ? (
          <>
            <label>Username</label>
            <input
              className="input-txt"
              placeholder="Enter username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            ></input>
          </>
        ) : (
          <>
            <label>Email</label>
            <input
              className="input-txt"
              placeholder="Enter your email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            ></input>
          </>
        )}
        {label !== "Reset Password" ? (
          <>
            <label>Password</label>
            <input
              className="input-txt"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            ></input>
          </>
        ) : null}
        <input className="input-submit" type="submit" value={label}></input>
      </form>
      {label === "Log In" ? (
        <div>
          <hr></hr>
          <div className="reg-recovery">
            <p className="lost-pw" onClick={redirectPasswordChange}>
              Forgot Password?
            </p>
            <p>
              Don't have an account? {""}
              <span className="alt" onClick={changeForm}>
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
              <span className="alt" onClick={changeForm}>
                Log in
              </span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
