import React from "react";
import { useParams } from "react-router-dom";
import { PasswordForm } from "./components/password-form";
import "./login.css";

export default function PasswordResetPage() {
  const idObj = useParams("encrypted");
  const idObj2 = useParams("iv");
  return (
    <PasswordForm
      label="Reset Password"
      encrypted={idObj.encrypted}
      iv={idObj2.iv}
    />
  );
}
