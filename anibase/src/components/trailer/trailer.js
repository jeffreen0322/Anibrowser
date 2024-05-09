import "./trailer.css";

export default function Trailer({ trailer }) {
  return (
    <div className="trailer">
      <iframe
        className="video"
        width="420"
        height="315"
        title="trailer"
        src={trailer}
      ></iframe>
    </div>
  );
}
