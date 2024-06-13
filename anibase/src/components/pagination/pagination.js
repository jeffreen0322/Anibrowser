import React from "react";
import NextButton from "./next/next";
import PreviousButton from "./prev/prev";
import "./pagination.css";

export default function Pagination({ directory, page }) {
  return (
    <span className="pagination">
      <PreviousButton directory={directory} page={page} />
      <NextButton directory={directory} page={page} />
    </span>
  );
}
