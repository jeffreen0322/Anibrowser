import React, { useEffect, useState } from "react";
import AnimeEntry from "./anime-entry/animeEntry";

export default function SeasonalList() {
  // Set a const for top animes using useState -> Empty array.
  const [seasonalAnime, SetSeasonalAnime] = useState([]);

  // Async function to fetch from api.
  const GetSeasonalAnime = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/seasons/now?limit=10"
    ).then((res) => res.json());

    // Set the top animes.
    SetSeasonalAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetSeasonalAnime();
  }, []);

  return (
    <div className="seasonal">
      {seasonalAnime.map((anime) => (
        <AnimeEntry
          key={anime.title}
          title={anime.title}
          episodes={anime.episodes}
          image={anime.images.jpg.image_url}
        />
      ))}
    </div>
  );
}
