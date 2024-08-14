import React, { useEffect, useState } from "react";
import AnimeEntry from "./anime-entry/animeEntry";
import Category from "./named-header/category";
import { useParams } from "react-router-dom";

export default function TopList() {
  // Set a const for top animes using useState -> Empty array.
  const [topAnime, SetTopAnime] = useState([]);
  const typeObj = useParams("type");
  const idObj = useParams("page");

  // Async function to fetch from api.
  const GetTopAnime = async () => {
    const api =
      typeObj.type === "anime"
        ? "https://api.jikan.moe/v4/top/anime?page="
        : "https://api.jikan.moe/v4/top/manga?page=";
    const temp = await fetch(api + idObj.page).then((res) => res.json());

    // Set the top animes.
    SetTopAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetTopAnime();
  }, []);

  return (
    <div>
      <Category
        name={`Top ${
          typeObj.type.charAt(0).toUpperCase() + typeObj.type.slice(1)
        }`}
      />
      <div className="top">
        {topAnime.map((anime) => (
          <AnimeEntry
            key={anime.title}
            id={anime.mal_id}
            title={anime.title}
            score={anime.score}
            episodes={
              typeObj.type === "manga" ? anime.chapters : anime.episodes
            }
            image={anime.images.jpg.image_url}
            season={
              anime.season != null && anime.year != null
                ? anime.season + " " + anime.year
                : typeObj.type === "manga"
                ? null
                : "N/A"
            }
            showEpisode={true}
          />
        ))}
      </div>
    </div>
  );
}
