import myImage from "../../images/anibrowser.png";
import "./anibrowser-graphic.css";

export default function AnibrowserGraphic() {
  return (
    <div className="picture">
      <img src={myImage} alt="Anibrowser Picture" id="anibrowser" />
    </div>
  );
}
