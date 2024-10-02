import React, { useEffect, useState } from "react";
import AnimeEntry from "../../components/anime-entry/animeEntry";
import Category from "../../components/named-header/category";
import Pagination from "../../components/pagination/pagination";
import getUniqueEntries from "../../helpers/getUniqueEntries";
import { useNavigate, useParams } from "react-router-dom";
import Footer from "../../components/footer/footer";
import UpChevron from "../../components/redirect/up/up";
import "./anime-search.css";

export default function AnimeSearch() {
  const idObj = useParams("id");
  const idObj2 = useParams("page");
  const typeObj = useParams("type");
  const directory = `${typeObj.type}/search/${idObj.id}/`;
  const searchResults = GetResults();
  return (
    <div>
      <AnimeSearchList animeResults={searchResults[0]} />
      <Pagination
        directory={directory}
        page={idObj2.page}
        count={searchResults[1]}
      />
      <Footer />
      <UpChevron id="navigation" />
    </div>
  );
}

function GetResults() {
  const [animeResults, SetAnimeResults] = useState([]);
  const [paginationResults, SetPaginationResults] = useState([]);

  const idObj = useParams("id");
  const idObj2 = useParams("page");
  const typeObj = useParams("type");

  // Async function to fetch from api.
  const GetAnimeResults = async () => {
    const temp = await fetch(
      `https://api.jikan.moe/v4/${typeObj.type}?q=` +
        idObj.id +
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
  const navigate = useNavigate();
  const searchResults = getUniqueEntries(animeResults);
  const idObj = useParams("id");
  const typeObj = useParams("type");
  const handleRedirect = () => {
    navigate(
      `/${typeObj.type === "anime" ? "manga" : "anime"}/search/${idObj.id}/1`
    );

    window.location.reload();
  };

  return (
    <div>
      <Category
        name={`${idObj.id} (${
          typeObj.type.charAt(0).toUpperCase() + typeObj.type.slice(1)
        })`}
      />
      <div className="type-filter">
        <button className="filter-btn" onClick={handleRedirect}>
          <strong>{typeObj.type === "anime" ? "Manga" : "Anime"}</strong>
        </button>
      </div>
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
