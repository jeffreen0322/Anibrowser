import React from "react";
import GenreList from "../../components/genreList";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import "./genre.css";
import Pagination from "../../components/pagination/pagination";

export default function GenrePage() {
  const idObj = useParams("id");
  const idObj2 = useParams("name");
  const idObj3 = useParams("page");
  const directory = "/genre/" + idObj.id + "/" + idObj2.name + "/";
  const searchResults = GetResults();

  return (
    <div>
      <GenreList />
      <Pagination
        directory={directory}
        page={idObj3.page}
        count={searchResults}
      />
    </div>
  );
}

function GetResults() {
  const [paginationResults, SetPaginationResults] = useState([]);

  const idObj = useParams("id");
  const idObj2 = useParams("page");

  // Async function to fetch from api.
  const GetPaginationResults = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/anime?genres=" +
        idObj.id +
        "&" +
        "page=" +
        idObj2.page
    ).then((res) => res.json());

    // Set the top animes.
    SetPaginationResults(temp.pagination);
  };

  // Used when fetching data.
  useEffect(() => {
    GetPaginationResults();
  }, []);

  return paginationResults;
}
