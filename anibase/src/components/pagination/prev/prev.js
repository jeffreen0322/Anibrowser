import React from "react";
import { useNavigate } from "react-router-dom";
import "./prev.css";

export default function PreviousButton({ directory, page }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const prevPage = (Number(page) - 1).toString();

    if (Number(prevPage) > 0) {
      navigate(directory + prevPage);

      if (typeof window !== "undefined") {
        window.location.href = directory + prevPage;
      }
    }
  };

  return (
    <button id="prev" type="button" onClick={handleRedirect}>
      Prev
    </button>
  );
}
