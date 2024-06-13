import React from "react";
import { useNavigate } from "react-router-dom";
import "./next.css";

export default function NextButton({ directory, page }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const nextPage = (Number(page) + 1).toString();
    console.log("directory: " + directory);
    navigate(directory + nextPage);

    if (typeof window !== "undefined") {
      window.location.href = directory + nextPage;
    }
  };

  return (
    <button id="next" type="button" onClick={handleRedirect}>
      Next
    </button>
  );
}
