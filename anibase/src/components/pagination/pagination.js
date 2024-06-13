import React from "react";
import NextButton from "./next/next";
import PreviousButton from "./prev/prev";
import "./pagination.css";

export default function Pagination({ page }) {
  return (
    <span className="pagination">
      <PreviousButton page={page} />
      <NextButton page={page} />
    </span>
  );
}
