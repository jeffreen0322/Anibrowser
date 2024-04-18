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

  return (
    <div>
      <ul>
        {topAnime.map((anime) => (
          <AnimeEntry key={anime.title} title={anime.title} />
        ))}
      </ul>
    </div>
  );
}

function AnimeEntry(props) {
  return <li>{props.title}</li>;
}

export default TopPage;
