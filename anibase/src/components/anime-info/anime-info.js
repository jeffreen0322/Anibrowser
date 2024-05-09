import Trailer from "../trailer/trailer";
import AnimeTextInfo from "./text-info";
import Synopsis from "./synopsis";
import "./anime-info.css";

export default function AnimeInfo({ data }) {
  return (
    <div className="ani-info">
      <Trailer trailer={data.trailer.embed_url} />
      <AnimeTextInfo data={data} />
      <Synopsis plot={data.synopsis} />
    </div>
  );
}
