import React, { useEffect, useState } from "react";
import AnimeEntry from "./anime-entry/animeEntry";
import Category from "./named-header/category";
import getUniqueEntries from "../helpers/getUniqueEntries";

export default function SeasonalList() {
  // Set a const for top animes using useState -> Empty array.
  const [seasonalAnime, SetSeasonalAnime] = useState([]);
  const [upcomingAnime, SetUpcomingAnime] = useState([]);

  // Async function to get current seasonal.
  const GetSeasonalAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/seasons/now").then(
      (res) => res.json()
    );

    // Set the top animes.
    SetSeasonalAnime(temp.data);
  };

  // Async function to get upcoming seasonal.
  const GetUpcomingAnime = async () => {
    const temp = await fetch("https://api.jikan.moe/v4/seasons/upcoming").then(
      (res) => res.json()
    );

    // Set the top animes.
    SetUpcomingAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetSeasonalAnime();
    GetUpcomingAnime();
  }, []);

  const seasonal = getUniqueEntries(seasonalAnime);
  const upcoming = getUniqueEntries(upcomingAnime);

  return (
    <div>
      <Category name="Seasonal Anime" />
      <div className="seasonal">
        {seasonal.map((anime) => (
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

      <Category name="Upcoming Anime" />
      <div className="upcoming">
        {upcoming.map((anime) => (
          <AnimeEntry
            key={anime.title}
            id={anime.mal_id}
            title={anime.title}
            score={anime.score}
            episodes={anime.episodes}
            image={anime.images.jpg.image_url}
            season={null}
            showEpisode={false}
          />
        ))}
      </div>
    </div>
  );
}
