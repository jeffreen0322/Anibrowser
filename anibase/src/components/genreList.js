import React, { useEffect, useState } from "react";
import AnimeEntry from "./anime-entry/animeEntry";
import Category from "./named-header/category";
import { useParams } from "react-router-dom";

export default function GenreList() {
  // Set a const for top animes using useState -> Empty array.
  const [genres, SetGenres] = useState([]);
  const idObj = useParams("id");
  const idObj2 = useParams("name");

  // Async function to fetch from api.
  const GetGenres = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/anime?genres=" + idObj.id
    ).then((res) => res.json());

    // Set the top animes.
    SetGenres(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetGenres();
  }, [idObj]);

  console.log(genres);

  return (
    <div>
      <Category name={idObj2.name} />
      <div className="genre">
        {genres.map((anime) => (
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
          />
        ))}
      </div>
    </div>
  );
}
