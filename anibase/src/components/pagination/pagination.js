import React from "react";
import NextButton from "./next/next";
import PreviousButton from "./prev/prev";
import "./pagination.css";

export default function Pagination({ page }) {
  return (
    <span className="pagination">
      <NextButton page={page} />
      <PreviousButton page={page} />
    </span>
  );
}
