import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimeGeneral from "../../components/anime-info/anime-general";
import RecommendedAnime from "../../components/recommended/recommended";
import "./anime.css";
import CharacterDisplayButton from "../../components/display/character/character-display";

export default function AnimePage() {
  const idObj = useParams("id");
  const typeObj = useParams("type");
  const [anime, SetAnime] = useState({
    mal_id: "",
    title: "",
    score: "",
    episodes: "",
    images: { jpg: "" },
    trailer: { embed_url: "" },
  });

  const [characters, SetCharacters] = useState([]);
  const type =
    typeObj.type === "anime"
      ? "https://api.jikan.moe/v4/anime/"
      : "https://api.jikan.moe/v4/manga/";

  // Async function to fetch from api.
  const GetAnime = async () => {
    const temp = await fetch(type + idObj.id + "/full").then((res) =>
      res.json()
    );

    // Set the top animes.
    SetAnime(temp.data);
  };

  // Async function to fetch from api.
  const GetCharacters = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${typeObj.type}/` + idObj.id + "/characters"
    ).then((res) => res.json());

    // Set the characters..
    SetCharacters(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetAnime();
    GetCharacters();
  }, []);

  return (
    <div className="ani-container">
      <AnimeGeneral anime={anime} />
      <CharacterDisplayButton list={characters} />
      <RecommendedAnime id={idObj.id} />
    </div>
  );
}
