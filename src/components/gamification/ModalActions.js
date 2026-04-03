import ModalTooltip from "./ModalTooltip";

const ModalActions = ({
  canCreate,
  onBlockedAttempt,
  onCancel,
  onCreate,
  onHideTooltip,
  onShowTooltip,
  showTooltip,
  tooltipMessage,
}) => {
  const blocked = !canCreate;
  const tooltipId = "create-reward-tooltip";

  const handleBlockedAttempt = () => {
    if (blocked) {
      onBlockedAttempt();
    }
  };

  return (
    <div className="relative pt-2">
      {showTooltip ? <ModalTooltip id={tooltipId} message={tooltipMessage} /> : null}
      <div className="flex gap-4">
        <button
          className="flex h-control flex-1 items-center justify-center rounded-button border border-border bg-white text-body text-text transition-colors hover:bg-surface-hover"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          aria-describedby={showTooltip ? tooltipId : undefined}
          aria-disabled={blocked}
          className={`flex h-control flex-1 items-center justify-center rounded-button text-body text-white transition-colors ${
            blocked ? "cursor-not-allowed bg-magenta-10" : "bg-primary hover:bg-magenta-11"
          }`}
          onBlur={blocked ? onHideTooltip : undefined}
          onClick={blocked ? handleBlockedAttempt : onCreate}
          onFocus={blocked ? onShowTooltip : undefined}
          onMouseEnter={blocked ? onShowTooltip : undefined}
          onMouseLeave={blocked ? onHideTooltip : undefined}
          type="button"
        >
          Create Reward
        </button>
      </div>
    </div>
  );
};

export default ModalActions;
