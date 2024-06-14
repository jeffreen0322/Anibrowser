import React from "react";
import { useNavigate } from "react-router-dom";
import "./next.css";

export default function NextButton({ directory, page, count }) {
  const navigate = useNavigate();
  const handleRedirect = () => {
    const nextPage = (Number(page) + 1).toString();

    if (count.current_page > 1) {
      if (
        (count.current_page - 1) * count.items.per_page + count.items.count <
        count.items.total
      ) {
        NavigateLink(navigate, directory, nextPage);
      }
    } else {
      if (count.items.count < count.items.total) {
        NavigateLink(navigate, directory, nextPage);
      }
    }
  };

  return (
    <button id="next" type="button" onClick={handleRedirect}>
      Next
    </button>
  );
}

function NavigateLink(navigation, directory, nextPage) {
  navigation(directory + nextPage);

  if (typeof window !== "undefined") {
    window.location.href = directory + nextPage;
  }
}
