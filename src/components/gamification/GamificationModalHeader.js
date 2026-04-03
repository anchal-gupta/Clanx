import CloseIcon from "./icons/CloseIcon";

const GamificationModalHeader = ({ onClose }) => (
  <div className="flex items-start justify-between gap-4">
    <h2 id="gamification-modal-title" className="font-primary text-modal-title font-medium text-text">
      Create your reward system
    </h2>
    <button
      aria-label="Close modal"
      className="-mr-1 -mt-1 rounded-full p-1 text-text-secondary transition-colors hover:bg-magenta-3/50 hover:text-text"
      onClick={onClose}
      type="button"
    >
      <CloseIcon className="h-6 w-6" />
    </button>
  </div>
);

export default GamificationModalHeader;
