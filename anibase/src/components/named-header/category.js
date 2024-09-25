import React from "react";
import "./category.css";

export default function Category({ name }) {
  return (
    <div className="category-container">
      <h2 className="category">{name}</h2>
    </div>
  );
}
