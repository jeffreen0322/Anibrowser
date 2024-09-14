import React from "react";
import { useNavigate } from "react-router-dom";
import "../pgn-btn.css";

export default function NextButton({ page, count }) {
  const navigate = useNavigate();

  const handleRedirect = () => {
    const nextPage = (Number(page) + 1).toString();

    if (count.current_page > 1) {
      if (
        (count.current_page - 1) * count.items.per_page + count.items.count <
        count.items.total
      ) {
        NavigateLink(navigate, nextPage);
      }
    } else {
      if (count.items.count < count.items.total) {
        NavigateLink(navigate, nextPage);
      }
    }
  };

  return (
    <button
      className="pgn-btn"
      id="next"
      type="button"
      onClick={handleRedirect}
    >
      <strong>Next</strong>
    </button>
  );
}

function NavigateLink(navigate, nextPage) {
  const currentPath = window.location.pathname;
  const newPath = currentPath.replace(/\/\d+$/, `/${nextPage}`);
  navigate(newPath, { replace: true });
  window.location.reload();
}
