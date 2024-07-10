import React, { useState } from "react";
import CharacterList from "../../characters/character-list";
import "./character-display.css";

export default function CharacterDisplayButton({ id }) {
  const [display, SetDisplay] = useState(false);

  // Get the previous display and changes it.
  const ToggleDisplay = () => {
    SetDisplay((displayFlag) => !displayFlag);
  };

  return display === false ? (
    <button id="char-display" onClick={ToggleDisplay}>
      Show Characters
    </button>
  ) : (
    <div>
      <button id="char-display" onClick={ToggleDisplay}>
        Hide Characters
      </button>
      <CharacterList id={id} />
    </div>
  );
}
