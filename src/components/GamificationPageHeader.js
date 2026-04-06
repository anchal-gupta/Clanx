import bellIcon from "../components/icons/System.png";
import profileIcon from "../components/icons/Profile.png";

const GamificationPageHeader = () => (
  <header className="mb-page-header-gap flex items-center justify-between">
    <h1 className="font-primary text-page-title font-semibold text-text">Gamification</h1>

    <div className="flex items-center gap-header-actions">
      <div className="relative inline-flex h-header-notification w-header-notification items-center justify-center">
        <img alt="" aria-hidden="true" className="block h-full w-full object-contain" draggable="false" src={bellIcon} />
        <span className="absolute -right-1 -top-1 flex h-header-badge w-header-badge items-center justify-center rounded-full bg-danger text-caption font-semibold leading-none text-white">
          5
        </span>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className="block h-header-avatar w-header-avatar rounded-full object-cover"
        draggable="false"
        src={profileIcon}
      />
    </div>
  </header>
);

export default GamificationPageHeader;
