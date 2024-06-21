import React from "react";
import Category from "../named-header/category";
import AnimeInfo from "./anime-info";

export default function AnimeGeneral({ anime }) {
  return (
    <div>
      <Category id="ani-title" name={anime.title} />
      <AnimeInfo data={anime} />
    </div>
  );
}
