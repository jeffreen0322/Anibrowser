import React, { useState } from "react";
import CharacterList from "../../characters/character-list";
import "./character-display.css";

export default function CharacterDisplayButton({ list }) {
  const [display, SetDisplay] = useState(false);

  // Get the previous display and changes it.
  const ToggleDisplay = () => {
    SetDisplay((displayFlag) => !displayFlag);
  };

  return display === false ? (
    <button id="char-display" onClick={ToggleDisplay}>
      <strong>Show Characters</strong>
    </button>
  ) : (
    <div>
      <button id="char-display" onClick={ToggleDisplay}>
        <strong>Hide Characters</strong>
      </button>
      <CharacterList characters={list} />
    </div>
  );
}
