import React, { useEffect, useState } from "react";
import AnimeEntry from "./anime-entry/animeEntry";

export default function TopList() {
  // Set a const for top animes using useState -> Empty array.
  const [topAnime, SetTopAnime] = useState([]);

  // Async function to fetch from api.
  const GetTopAnime = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/top/anime?limit=10"
    ).then((res) => res.json());

    // Set the top animes.
    SetTopAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetTopAnime();
  }, []);

  console.log(topAnime);

  return (
    <div className="top">
      {topAnime.map((anime) => (
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
