import "./animeEntry.css";

export default function AnimeEntry({ title, episodes, image }) {
  return (
    <div className="ani-entry">
      <img src={image} alt={title} />
      <p>
        <strong>{title}</strong>
      </p>
      <p>Episodes: {episodes}</p>
    </div>
  );
}
