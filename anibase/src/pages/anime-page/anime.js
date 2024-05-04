import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnimeEntry from "../../components/anime-entry/animeEntry";
import Category from "../../components/named-header/category";
import "./anime.css";

export default function AnimePage() {
  const idObj = useParams("id");
  const [anime, SetAnime] = useState([]);

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
    <div>
      <Category name={anime.title} />
      <div className="seasonal">
        <AnimeEntry
          key={anime.title}
          id={anime.mal_id}
          title={anime.title}
          score={anime.score}
          episodes={anime.episodes}
        />
      </div>
    </div>
  );
}
