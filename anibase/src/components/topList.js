import React, { useEffect, useState } from "react";
import AnimeEntry from "./anime-entry/animeEntry";
import Category from "./named-header/category";
import { useParams } from "react-router-dom";

export default function TopList() {
  // Set a const for top animes using useState -> Empty array.
  const [topAnime, SetTopAnime] = useState([]);
  const idObj = useParams("page");

  // Async function to fetch from api.
  const GetTopAnime = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/top/anime?page=" + idObj.page
    ).then((res) => res.json());

    // Set the top animes.
    SetTopAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetTopAnime();
  }, []);

  return (
    <div>
      <Category name="Top Animes" />
      <div className="top">
        {topAnime.map((anime) => (
          <AnimeEntry
            key={anime.title}
            id={anime.mal_id}
            title={anime.title}
            score={anime.score}
            episodes={anime.episodes}
            image={anime.images.jpg.image_url}
            season={
              anime.season != null && anime.year != null
                ? anime.season + " " + anime.year
                : "N/A"
            }
            showEpisode={true}
          />
        ))}
      </div>
    </div>
  );
}
