import React, { useEffect, useState } from "react";
import AnimeEntry from "../../components/anime-entry/animeEntry";
import Category from "../../components/named-header/category";
import { useParams } from "react-router-dom";
import "./anime-search.css";

export default function AnimeSearch() {
  return <AnimeSearchList />;
}

function AnimeSearchList() {
  // Set a const for top animes using useState -> Empty array.
  const [animeResults, SetAnimeResults] = useState([]);
  const idObj = useParams("id");

  // Async function to fetch from api.
  const GetAnimeResults = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/anime?q=" + idObj.id
    ).then((res) => res.json());

    if (!animeResults.includes(temp.data)) {
      SetAnimeResults(temp.data);
    }
  };

  // Used when fetching data.
  useEffect(() => {
    GetAnimeResults();
  }, [idObj]);

  console.log(animeResults);

  return (
    <div>
      <Category name="Search Results" />
      <div className="results">
        {animeResults.map((anime) => (
          <AnimeEntry
            key={anime.title}
            id={anime.mal_id}
            title={anime.title}
            score={anime.score}
            episodes={anime.episodes}
            image={anime.images.jpg.image_url}
            season={null}
          />
        ))}
      </div>
    </div>
  );
}
