import React from "react";
import TopList from "../../components/topList";
import Pagination from "../../components/pagination/pagination";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./top.css";

export default function TopPage() {
  const objId = useParams("page");
  const searchResults = GetResults(objId.page);
  return (
    <div>
      <TopList />
      <Pagination directory="/top/" page={objId.page} count={searchResults} />
    </div>
  );
}

function GetResults(page) {
  const [paginationResults, SetPaginationResults] = useState([]);

  // Async function to fetch from api.
  const GetPaginationResults = async () => {
    const temp = await fetch(
      "https://api.jikan.moe/v4/top/anime?page=" + page
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
