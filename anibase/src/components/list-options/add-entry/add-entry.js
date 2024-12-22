import React from "react";
import { useState } from "react";
import "./add-entry.css";

export const AddEntry = () => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);

    // if (selectedValue !== "status-empty") {
    //   handleAddAnime();
    // }
  };

  return (
    <div className="add-container">
      <select
        name="status"
        id="watch-status"
        className="dropdown"
        value={selectedValue}
        onChange={handleChange}
      >
        <option value="status-empty" selected>
          Your status
        </option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};
