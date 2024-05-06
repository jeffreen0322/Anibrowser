import AnimeTextInfo from "./text-info";
import Synopsis from "./synopsis";
import "./anime-info.css";

export default function AnimeInfo({ data }) {
  return (
    <div className="ani-info">
      <img src={data.images.jpg.image_url} alt={data.title} />
      <AnimeTextInfo data={data} />
      <Synopsis plot={data.synopsis} />
    </div>
  );
}
