import { useMemo } from "react";
import { commissionTierOptions } from "../../constants/rewardWithOptions";
import { commissionTierTooltipMessage } from "../../constants/gamificationTooltips";
import ModalTooltip from "./ModalTooltip";
import NestedFieldSelect from "./NestedFieldSelect";

const CommissionTierPanel = ({
  draftSelection,
  onDraftChange,
  onGoBack,
  onHideSaveTooltip,
  onSave,
  onShowSaveTooltip,
  isTierSelectOpen,
  onTierSelectToggle,
  saveTooltipMessage,
  showSaveTooltip,
}) => {
  const tierField = useMemo(
    () => ({
      key: "tier",
      kind: "select",
      options: commissionTierOptions,
      placeholder: "Select a tier",
    }),
    [],
  );

  const selectedTier = draftSelection?.fields?.tier;
  const canSave = Boolean(selectedTier?.label);
  const tooltipId = "commission-tier-save-tooltip";

  const handleSave = () => {
    if (canSave) {
      onSave();
      return;
    }

    onShowSaveTooltip();
  };

  return (
    <div className="space-y-4 p-3">
      <div className="space-y-6">
        <h3 className="font-primary text-modal-title font-medium text-text">
          Select a commission tier
        </h3>
        <div className="space-y-2">
          <div className="flex items-center gap-0.5 text-label">
            <span className="font-body text-text-secondary">Upgrade to</span>
            <span className="font-body text-danger">*</span>
          </div>
          <NestedFieldSelect
            field={tierField}
            isOpen={isTierSelectOpen}
            onChange={onDraftChange}
            onClose={onTierSelectToggle}
            onToggle={onTierSelectToggle}
            value={selectedTier}
          />
        </div>
      </div>
      <div className="relative flex gap-3">
        <button
          className="flex h-control flex-1 items-center justify-center rounded-button border border-border bg-white text-body text-text transition-colors hover:bg-surface-hover"
          onClick={onGoBack}
          type="button"
        >
          Go Back
        </button>
        <button
          aria-describedby={!canSave && showSaveTooltip ? tooltipId : undefined}
          aria-disabled={!canSave}
          className={`flex h-control flex-1 items-center justify-center rounded-button text-body text-white transition-colors ${
            canSave ? "bg-primary hover:bg-magenta-11" : "cursor-not-allowed bg-magenta-10/80"
          }`}
          onBlur={!canSave ? onHideSaveTooltip : undefined}
          onClick={handleSave}
          onFocus={!canSave ? onShowSaveTooltip : undefined}
          onMouseEnter={!canSave ? onShowSaveTooltip : undefined}
          onMouseLeave={!canSave ? onHideSaveTooltip : undefined}
          type="button"
        >
          Save
        </button>
        {showSaveTooltip ? <ModalTooltip id={tooltipId} message={saveTooltipMessage ?? commissionTierTooltipMessage} /> : null}
      </div>
    </div>
  );
};

export default CommissionTierPanel;
