import { featureCardArtwork } from "../constants/gamificationDecorations";

const FeatureCard = ({ title, description, icon: iconSrc }) => (
  <article className="relative h-card-height w-full max-w-feature-card overflow-hidden rounded-card border border-magenta-4 bg-white shadow-card">
    <div
      className="pointer-events-none absolute overflow-hidden opacity-40"
      style={featureCardArtwork.container}
    >
      {featureCardArtwork.rings.map((ring) => (
        <span
          className="absolute rounded-full border border-magenta-4"
          key={`${ring.left}-${ring.top}-${ring.width}-${ring.height}`}
          style={ring}
        />
      ))}
    </div>
    <div className="absolute left-1/2 top-6 flex h-card-icon-outer w-card-icon-outer -translate-x-1/2 items-center justify-center rounded-card-icon-outer bg-magenta-7">
      <div className="flex h-card-icon-inner w-card-icon-inner items-center justify-center rounded-card-icon-inner bg-white">
        <img
          alt=""
          className="h-card-icon w-card-icon object-contain"
          draggable="false"
          src={iconSrc}
        />
      </div>
    </div>
    <div className="absolute left-feature-card-copy-left top-feature-card-copy-top flex w-feature-card-copy-width flex-col items-center gap-2 text-center">
      <h3 className="w-full font-primary text-body font-medium text-text">{title}</h3>
      <p className="w-full text-label text-text-secondary">{description}</p>
    </div>
  </article>
);

export default FeatureCard;
