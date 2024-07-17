import { Link } from "react-router-dom";
import genres from "../../data/genres";
import "./text-info.css";

export default function AnimeTextInfo({ data }) {
  return (
    <ul className="text-info">
      <li>
        <strong>Japanese Name</strong>: "{data.title_japanese}"
      </li>
      <li>
        <strong>English Name</strong>: "{data.title_english}"
      </li>
      <li>
        <strong>Score</strong>: {data.score}
      </li>
      {data.episodes == null ? (
        <li>
          <strong>Episodes</strong>: N/A
        </li>
      ) : (
        <li>
          <strong>Episodes</strong>: {data.episodes}
        </li>
      )}

      <li>
        <strong>Genres</strong>:{" "}
        {data.genres &&
          data.genres.map((genre, index) => (
            <span key={genre.mal_id}>
              <Link
                to={
                  `/genre/` + getGenreId(genre.name) + "/" + genre.name + "/1"
                }
              >
                {genre.name}
              </Link>
              {index !== data.genres.length - 1 && ", "}
            </span>
          ))}
      </li>

      <li>
        <strong>Year</strong>: {data.year}
      </li>
      <li>
        <strong>Studio</strong>:{" "}
        {data.studios &&
          data.studios.map((studio, index) => (
            <span key={studio.mal_id}>
              {studio.name}
              {index !== data.studios.length - 1 && ", "}
            </span>
          ))}
      </li>
    </ul>
  );
}

function getGenreId(genreElement) {
  let id = "";
  genres.forEach((genre) => {
    if (genre.name === genreElement) {
      id = genre.mal_id.toString();
    }
  });

  return id;
}
