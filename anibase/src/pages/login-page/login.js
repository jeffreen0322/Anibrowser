import React from "react";
import { Form } from "./components/form";
import "./login.css";

export default function LoginPage() {
  return (
    <div className="login-container">
      <Form label="Log in" />;
    </div>
  );
}
