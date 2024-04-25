import React, { useEffect, useState } from "react";

function TopPage() {
  return <TopList />;
}

function TopList() {
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
    <div>
      <ul>
        {topAnime.map((anime) => (
          <AnimeEntry
            key={anime.title}
            title={anime.title}
            episodes={anime.episodes}
            image={anime.images.jpg.image_url}
          />
        ))}
      </ul>
    </div>
  );
}

function AnimeEntry({ title, episodes, image }) {
  return (
    <li>
      <p>{title}</p>
      <img src={image} alt={title} />
      <p>Episodes: {episodes}</p>
    </li>
  );
}

export default TopPage;
