import React from "react";
import TopList from "../../components/topList";
import Pagination from "../../components/pagination/pagination";
import { useParams } from "react-router-dom";
import "./top.css";

export default function TopPage() {
  const objId = useParams("id");
  console.log("id: " + objId.id);
  return (
    <div>
      <TopList />
      <Pagination page={objId.id} />
    </div>
  );
}
