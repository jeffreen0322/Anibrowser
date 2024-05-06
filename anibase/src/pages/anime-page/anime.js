import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from "../../components/named-header/category";
import AnimeInfo from "../../components/anime-info/anime-info";
import "./anime.css";

export default function AnimePage() {
  const idObj = useParams("id");
  const [anime, SetAnime] = useState({
    mal_id: "",
    title: "",
    score: "",
    episodes: "",
    images: { jpg: "" },
  });

  // Async function to fetch from api.
  const GetAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/anime/" + idObj.id).then(
      (res) => res.json()
    );

    // Set the top animes.
    SetAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetAnime();
  });

  console.log(anime);

  return (
    <div className="ani-container">
      <Category name={anime.title} />
      <AnimeInfo data={anime} />
    </div>
  );
}
