import React, { useState } from "react";
import CharacterList from "../characters/character-list";

export default function CharacterDisplayButton({ id }) {
  const [display, SetDisplay] = useState(false);

  // Get the previous display and changes it.
  const ToggleDisplay = () => {
    SetDisplay((displayFlag) => !displayFlag);
  };

  return display === false ? (
    <button onClick={ToggleDisplay}>Show Characters</button>
  ) : (
    <div>
      <button onClick={ToggleDisplay}>Hide Characters</button>
      <CharacterList id={id} />
    </div>
  );
}
