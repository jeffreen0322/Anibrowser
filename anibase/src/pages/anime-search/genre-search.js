import React, { useEffect, useState } from "react";
import AnimeEntry from "../../components/anime-entry/animeEntry";
import Category from "../../components/named-header/category";
import Pagination from "../../components/pagination/pagination";
import getUniqueEntries from "../../helpers/getUniqueEntries";
import { useParams } from "react-router-dom";
import genreObj from "../../data/genres";
import "./anime-search.css";

export default function GenreSearch() {
  const idObj = useParams("genre");
  const idObj2 = useParams("page");
  const directory = "/genre-search/" + idObj.genre + "/";
  const searchResults = GetResults();
  return (
    <div>
      <AnimeSearchList animeResults={searchResults[0]} />
      <Pagination
        directory={directory}
        page={idObj2.page}
        count={searchResults[1]}
      />
    </div>
  );
}

function GetResults() {
  const [animeResults, SetAnimeResults] = useState([]);
  const [paginationResults, SetPaginationResults] = useState([]);

  const idObj = useParams("genre");
  const idObj2 = useParams("page");
  const typeObj = useParams("type");

  // Async function to fetch from api.
  const GetAnimeResults = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${typeObj.type}?genres=` +
        genreObj[1].get(idObj.genre) +
        "&" +
        "page=" +
        idObj2.page
    ).then((res) => res.json());

    SetAnimeResults(temp.data);
    SetPaginationResults(temp.pagination);
  };

  // Used when fetching data.
  useEffect(() => {
    GetAnimeResults();
  }, [idObj]);

  return [animeResults, paginationResults];
}

function AnimeSearchList({ animeResults }) {
  const searchResults = getUniqueEntries(animeResults);
  const idObj = useParams("genre");

  return (
    <div>
      <Category name={idObj.genre} />
      <div className="results">
        {searchResults.map((anime) => (
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
