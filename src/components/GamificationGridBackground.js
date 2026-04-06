import tileImage from "../components/icons/Tile.png";

const GamificationGridBackground = () => (
  <img
    alt=""
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 h-full w-full rounded-hero object-fill"
    draggable="false"
    src={tileImage}
  />
);

export default GamificationGridBackground;
