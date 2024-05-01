import "./animeEntry.css";

export default function AnimeEntry({ title, episodes, image }) {
  return (
    <div className="ani-entry">
      <p>{title}</p>
      <img src={image} alt={title} />
      <p>Episodes: {episodes}</p>
    </div>
  );
}
