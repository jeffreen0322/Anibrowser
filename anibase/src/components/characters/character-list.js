import { React, useState, useEffect } from "react";
import Character from "./character";
import "./character-list.css";

export default function CharacterList({ characters }) {
  return (
    <div className="characters">
      {characters.slice(0, 16).map((data) => (
        <Character
          key={data.character.mal_id}
          role={data.role}
          name={data.character.name}
          image={data.character.images.jpg.image_url}
        />
      ))}
    </div>
  );
}
