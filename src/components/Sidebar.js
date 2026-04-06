import brainIcon from "../components/icons/Brain.png";
import briefcaseIcon from "../components/icons/Briefcase.png";
import homeIcon from "../components/icons/Home.png";
import applicationsIcon from "../components/icons/APplications.png";
import walletIcon from "../components/icons/Wallet.png";

const navItems = [
  {
    iconSrc: homeIcon,
    label: "Home",
  },
  {
    iconSrc: brainIcon,
    label: "Insights",
  },
  {
    active: true,
    iconSrc: briefcaseIcon,
    label: "Gamification",
  },
  {
    iconSrc: applicationsIcon,
    label: "Applications",
  },
  {
    iconSrc: walletIcon,
    label: "Payments",
  },
];

const SidebarIconImage = ({ className = "", src }) => (
  <span
    aria-hidden="true"
    className={`inline-block shrink-0 bg-current ${className}`}
    style={{
      WebkitMaskImage: `url(${src})`,
      WebkitMaskPosition: "center",
      WebkitMaskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskImage: `url(${src})`,
      maskPosition: "center",
      maskRepeat: "no-repeat",
      maskSize: "contain",
    }}
  />
);

const SettingsIcon = ({ className = "" }) => (
  <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
    <path
      d="M12 12.25a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
    <path
      d="M6 19a6 6 0 0 1 12 0"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.8"
    />
  </svg>
);

const SidebarNavItem = ({ active = false, icon, label }) => (
  <button
    aria-current={active ? "page" : undefined}
    className={`flex h-9 w-full items-center gap-2 rounded-button px-2 text-left text-label transition-colors ${
      active
        ? "bg-white text-magenta-12"
        : "text-text-secondary hover:bg-magenta-1 hover:text-text"
    }`}
    type="button"
  >
    <SidebarIconImage className="h-5 w-5" src={icon} />
    <span className={active ? "font-medium" : "font-normal"}>{label}</span>
  </button>
);

const Sidebar = () => (
  <aside className="hidden min-h-screen w-sidebar shrink-0 flex-col bg-magenta-3 px-4 py-4 lg:flex">
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 pb-6 pt-2">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-magenta-10 to-magenta-14 opacity-80" />
        <span className="font-primary text-body font-semibold text-text">SARAL</span>
      </div>

      <nav aria-label="Primary navigation">
        <div className="space-y-1">
          {navItems.map((item) => (
            <SidebarNavItem
              active={item.active}
              icon={item.iconSrc}
              key={item.label}
              label={item.label}
            />
          ))}
        </div>
      </nav>

      <div className="mt-auto pb-2">
        <button
          className="flex h-9 w-full items-center gap-2 rounded-button px-2 text-left text-label text-text-secondary transition-colors hover:bg-magenta-1 hover:text-text"
          type="button"
        >
          <SettingsIcon className="h-5 w-5 shrink-0" />
          <span className="font-normal">Settings</span>
        </button>
      </div>
    </div>
  </aside>
);

export default Sidebar;
