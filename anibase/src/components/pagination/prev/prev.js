import React from "react";
import { useNavigate } from "react-router-dom";
import "./prev.css";

export default function PreviousButton({ page }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const prevPage = (Number(page) - 1).toString();

    if (Number(prevPage) > 0) {
      navigate("/top/" + prevPage);

      if (typeof window !== "undefined") {
        window.location.href = "/top/" + prevPage;
      }
    }
  };

  return (
    <button id="prev" type="button" onClick={handleRedirect}>
      Prev
    </button>
  );
}
