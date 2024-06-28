import { React, useState, useEffect } from "react";
import Character from "./character";
import "./character-list.css";

export default function CharacterList({ id }) {
  const [characters, SetCharacters] = useState();

  // Async function to fetch from api.
  const GetCharacters = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/anime/" + id + "/characters"
    ).then((res) => res.json());

    // Set the top animes.
    SetCharacters(temp.data);
  };

  // // Used when fetching data.
  useEffect(() => {
    GetCharacters();
  });

  console.log(characters);

  return (
    <div className="characters">
      {characters.map((data) => (
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
