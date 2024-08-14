import Trailer from "../trailer/trailer";
import AnimeTextInfo from "./text-info";
import Synopsis from "./synopsis";
import "./anime-info.css";
import { useParams } from "react-router-dom";

export default function AnimeInfo({ data }) {
  const typeObj = useParams("type");
  return (
    <div className="ani-info">
      {typeObj.type === "anime" ? (
        data.trailer.embed_url != null ? (
          <Trailer trailer={data.trailer.embed_url} />
        ) : (
          <img src={data.images.jpg.image_url} alt={data.title} />
        )
      ) : (
        <img src={data.images.jpg.image_url} alt={data.title} />
      )}
      <AnimeTextInfo data={data} />
      <Synopsis plot={data.synopsis} />
    </div>
  );
}
