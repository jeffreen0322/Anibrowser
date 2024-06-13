import React from "react";
import { useNavigate } from "react-router-dom";
import "./next.css";

export default function NextButton({ page }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const nextPage = (Number(page) + 1).toString();
    navigate("/top/" + nextPage);

    if (typeof window !== "undefined") {
      window.location.href = "/top/" + nextPage;
    }
  };

  return (
    <button id="next" type="button" onClick={handleRedirect}>
      Next
    </button>
  );
}
