import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Category from "../../components/named-header/category";

export default function AnimePage() {
  const idObj = useParams("id");
  const [anime, SetAnime] = useState({
    mal_id: "",
    title: "",
    score: "",
    episodes: "",
    images: { jpg: "" },
  });

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

  console.log(anime.images.jpg.image_url);

  return (
    <div className="container">
      <Category name={anime.title} />
      <AnimeInfo data={anime} />
    </div>
  );
}

// TODO: Make this exportable (It's own component).
function AnimeInfo({ data }) {
  return (
    <div className="ani=info">
      <img src={data.images.jpg.image_url} alt={data.title} />
      <AnimeTextInfo data={data} />
    </div>
  );

  function AnimeTextInfo({ data }) {
    return (
      <div>
        <h3>Score: {data.score}</h3>
        {data.episodes == null ? (
          <h3>Episodes: N/A</h3>
        ) : (
          <h3>Episodes: {data.episodes}</h3>
        )}
      </div>
    );
  }
}

// key={anime.title}
// id={anime.mal_id}
// title={anime.title}
// score={anime.score}
// episodes={anime.episodes}
// image={anime.images.jpg.image_url}
