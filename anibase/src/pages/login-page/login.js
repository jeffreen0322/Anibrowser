import React from "react";
import { Form } from "./components/form";
import { useLocation } from "react-router-dom";
import "./login.css";

export default function LoginPage() {
  const location = useLocation();
  const url = location.state?.redirectURL || "/";
  return (
    <div className="login-container">
      <Form label="Log In" redirect={url} />;
    </div>
  );
}
