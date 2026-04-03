import { gamificationGridBlocks } from "../constants/gamificationDecorations";

const GamificationGridBackground = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-hero opacity-60">
    <div className="absolute inset-0 bg-gamification-grid bg-grid" />
    {gamificationGridBlocks.map(({ className, ...position }, index) => (
      <span
        key={index}
        className={`absolute hidden h-grid-block w-grid-block md:block ${className}`}
        style={position}
      />
    ))}
  </div>
);

export default GamificationGridBackground;
