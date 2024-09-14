import React from "react";
import { useNavigate } from "react-router-dom";
import "../pgn-btn.css";

export default function PreviousButton({ page }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const prevPage = (Number(page) - 1).toString();

    if (Number(prevPage) > 0) {
      NavigateLink(navigate, prevPage);
    }
  };

  return (
    <button
      className="pgn-btn"
      id="prev"
      type="button"
      onClick={handleRedirect}
    >
      <strong>Prev</strong>
    </button>
  );
}

function NavigateLink(navigate, prevPage) {
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace(/\/\d+$/, `/${prevPage}`);
  navigate(newPath, { replace: true });
}
