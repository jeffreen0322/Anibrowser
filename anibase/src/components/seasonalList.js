import React, { useEffect, useState } from "react";
import AnimeEntry from "./anime-entry/animeEntry";
import Category from "./named-header/category";

export default function SeasonalList() {
  // Set a const for top animes using useState -> Empty array.
  const [seasonalAnime, SetSeasonalAnime] = useState([]);

  // Async function to fetch from api.
  const GetSeasonalAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/seasons/now").then(
      (res) => res.json()
    );

    // Set the top animes.
    SetSeasonalAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetSeasonalAnime();
  }, []);

  return (
    <div>
      <Category name="Seasonal Anime" />
      <div className="seasonal">
        {seasonalAnime.map((anime) => (
          <AnimeEntry
            key={anime.title}
            id={anime.mal_id}
            title={anime.title}
            score={anime.score}
            episodes={anime.episodes}
            image={anime.images.jpg.image_url}
            season={null}
            showEpisode={true}
          />
        ))}
      </div>
    </div>
  );
}
