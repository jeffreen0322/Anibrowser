import React from "react";
import Category from "../named-header/category";
import AnimeEntry from "../anime-entry/animeEntry";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./recommended.css";

export default function RecommendedAnime({ id }) {
  const [recommendedAnime, SetRecommendedAnime] = useState([]);
  const typeObj = useParams("type");

  // Async function to fetch from api.
  const GetRecommendedAnime = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${typeObj.type}/` + id + "/recommendations"
    ).then((res) => res.json());

    // Set the top animes.
    SetRecommendedAnime(temp.data);
  };

  // Used when fetching data.
  useEffect(() => {
    GetRecommendedAnime();
  }, []);

  return (
    <div>
      {recommendedAnime.length !== 0 ? (
        <>
          <Category
            name={`Recommended ${
              typeObj.type.charAt(0).toUpperCase() + typeObj.type.slice(1)
            }`}
          />
          <div className="recommendation">
            {recommendedAnime.map((anime) => (
              <AnimeEntry
                key={anime.entry.mal_id}
                id={anime.entry.mal_id}
                title={anime.entry.title}
                score={null}
                episodes={null}
                image={anime.entry.images.jpg.image_url}
                season={null}
                showEpisode={false}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
