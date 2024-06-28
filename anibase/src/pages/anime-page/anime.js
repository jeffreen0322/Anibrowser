import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimeGeneral from "../../components/anime-info/anime-general";
import RecommendedAnime from "../../components/recommended/recommended";
import "./anime.css";

export default function AnimePage() {
  const idObj = useParams("id");
  const [anime, SetAnime] = useState({
    mal_id: "",
    title: "",
    score: "",
    episodes: "",
    images: { jpg: "" },
    trailer: { embed_url: "" },
  });

  // Async function to fetch from api.
  const GetAnime = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/anime/" + idObj.id + "/full"
    ).then((res) => res.json());

    // Set the top animes.
    SetAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetAnime();
  });

  return (
    <div className="ani-container">
      <AnimeGeneral anime={anime} />
      <RecommendedAnime id={idObj.id} />
    </div>
  );
}
