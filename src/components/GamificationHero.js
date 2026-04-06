import GamificationGridBackground from "./GamificationGridBackground";
import PrimaryButton from "./PrimaryButton";

const GamificationHero = ({ enableButtonRef, onEnable }) => (
  <section className="relative h-hero overflow-hidden rounded-hero">
    <GamificationGridBackground />
    <div className="relative z-10 mx-auto flex w-full max-w-hero-content flex-col items-center gap-6 px-6 pt-hero-content-top text-center md:px-0">
      <div className="space-y-2">
        <h2 className="font-primary text-hero-title font-semibold text-primary-dark sm:whitespace-nowrap">
          Gamify your Campaign
        </h2>
        <p className="text-body text-text-secondary">
          Enable gamification to start crafting your custom reward system.
        </p>
      </div>
      <PrimaryButton ref={enableButtonRef} onClick={onEnable}>Enable Gamification</PrimaryButton>
    </div>
  </section>
);

export default GamificationHero;
