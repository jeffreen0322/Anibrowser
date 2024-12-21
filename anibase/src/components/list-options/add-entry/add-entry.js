import React from "react";
import { useState } from "react";

export const AddEntry = ({ anime }) => {
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
