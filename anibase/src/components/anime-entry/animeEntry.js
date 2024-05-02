import "./animeEntry.css";

export default function AnimeEntry({ title, episodes, score, image }) {
  return (
    <div className="ani-entry">
      <img src={image} alt={title} />
      <ul>
        <li>
          <strong>{title}</strong>
        </li>
        <li>Score: {score}</li>
        <li>Episodes: {episodes == null ? "N/A" : episodes}</li>
      </ul>
    </div>
  );
}
