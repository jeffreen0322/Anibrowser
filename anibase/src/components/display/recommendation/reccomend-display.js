import React, { useState } from "react";
import RecommendedAnime from "../../recommended/recommended";
import "./recommended-display.css";

export default function RecommendedDisplayButton({ id }) {
  const [display, SetDisplay] = useState(false);

  // Get the previous display and changes it.
  const ToggleDisplay = () => {
    SetDisplay((displayFlag) => !displayFlag);
  };

  return display === false ? (
    <button id="recommendation-extend" onClick={ToggleDisplay}>
      Show Recommended
    </button>
  ) : (
    <div>
      <button id="recommendation-extend" onClick={ToggleDisplay}>
        Hide Recommended
      </button>
      <RecommendedAnime id={id} />
    </div>
  );
}
