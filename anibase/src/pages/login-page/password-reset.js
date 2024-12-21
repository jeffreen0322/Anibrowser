import React from "react";
import { Form } from "./components/form";
import "./login.css";

export default function PasswordReset() {
  return (
    <div className="login-container">
      <Form label="Reset Password" />;
    </div>
  );
}
