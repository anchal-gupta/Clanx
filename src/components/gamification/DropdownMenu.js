import { useMemo, useState } from "react";
import {
  editTooltipMessage,
  getSelectionSaveTooltipId,
} from "../../constants/gamificationTooltips";
import { createSelectionDraft, getSelectedOption, isSelectionComplete } from "../../constants/selectionHelpers";
import { upgradeCommissionTierRewardValue } from "../../constants/rewardWithOptions";
import CheckIcon from "./icons/CheckIcon";
import EditIcon from "./icons/EditIcon";
import ModalTooltip from "./ModalTooltip";
import NestedFieldInput from "./NestedFieldInput";
import NestedFieldSelect from "./NestedFieldSelect";
import CommissionTierPanel from "./CommissionTierPanel";

const DropdownMenu = ({
  activeNestedPanel,
  activeNestedSelect,
  disabledOptionValues = [],
  draftSelection,
  onCancel,
  onCloseNestedPanel,
  onDraftChange,
  onNestedSelectToggle,
  onOpenNestedPanel,
  onHideSaveTooltip,
  onSave,
  onShowSaveTooltip,
  options,
  saveTooltipMessage,
  showSaveTooltip,
  selectionType,
}) => {
  const [hoveredOptionValue, setHoveredOptionValue] = useState(null);
  const selectedOption = getSelectedOption(options, draftSelection?.optionValue);
  const saveTooltipId = getSelectionSaveTooltipId(selectionType);
  const disabledValues = useMemo(() => new Set(disabledOptionValues), [disabledOptionValues]);
  const isCommissionTierPanelOpen =
    activeNestedPanel?.selectionType === selectionType &&
    activeNestedPanel.panelKey === "commissionTier";

  const orderedOptions = useMemo(() => {
    if (!selectedOption) {
      return options;
    }

    return [selectedOption, ...options.filter((option) => option.value !== selectedOption.value)];
  }, [options, selectedOption]);

  const canSave = isSelectionComplete(options, draftSelection);
  const hasNestedFields = Boolean(selectedOption?.fields?.length);
  const showActions =
    Boolean(draftSelection?.optionValue && hasNestedFields) &&
    !(selectionType === "rewardWith" && draftSelection.optionValue === upgradeCommissionTierRewardValue);

  const handleSelectOption = (option) => {
    if (disabledValues.has(option.value)) {
      return;
    }

    const isSelected = draftSelection?.optionValue === option.value;
    const shouldOpenCommissionPanel =
      selectionType === "rewardWith" && option.value === upgradeCommissionTierRewardValue;

    if (shouldOpenCommissionPanel) {
      if (!isSelected) {
        onDraftChange(createSelectionDraft(options, option.value));
      }

      onOpenNestedPanel({ panelKey: "commissionTier", selectionType });
      return;
    }

    if (isSelected) {
      return;
    }

    const nextSelection = createSelectionDraft(options, option.value);
    onDraftChange(nextSelection);
    onCloseNestedPanel();

    if (!option.fields.length) {
      onSave();
    }
  };

  const handleFieldChange = (fieldKey, fieldValue) => {
    onDraftChange({
      optionValue: draftSelection?.optionValue,
      fields: {
        ...(draftSelection?.fields ?? {}),
        [fieldKey]: fieldValue,
      },
    });
  };

  const handleSaveClick = () => {
    if (canSave) {
      onSave();
      return;
    }

    onShowSaveTooltip();
  };

  if (isCommissionTierPanelOpen) {
    const tierField = selectedOption?.fields?.[0];
    const tierSelectOpen =
      activeNestedSelect?.selectionType === selectionType &&
      activeNestedSelect?.fieldKey === tierField?.key;

    return (
      <div className="absolute left-0 top-full z-30 mt-1 w-full overflow-visible rounded-popover border border-border bg-white p-1 shadow-popup">
        <CommissionTierPanel
          draftSelection={draftSelection}
          isTierSelectOpen={tierSelectOpen}
          onDraftChange={handleFieldChange}
          onGoBack={onCloseNestedPanel}
          onHideSaveTooltip={onHideSaveTooltip}
          onSave={onSave}
          onShowSaveTooltip={onShowSaveTooltip}
          onTierSelectToggle={() => onNestedSelectToggle(tierField.key)}
          saveTooltipMessage={saveTooltipMessage}
          showSaveTooltip={showSaveTooltip}
        />
      </div>
    );
  }

  return (
    <div className="absolute left-0 top-full z-30 mt-1 w-full overflow-visible rounded-popover border border-border bg-white p-1 shadow-popup">
      <div className="space-y-1 overflow-visible">
        {orderedOptions.map((option) => {
          const isSelected = draftSelection?.optionValue === option.value;
          const fieldLayout = option.fieldLayout === "two-column" ? "grid grid-cols-2 gap-2" : "space-y-2";
          const isDisabled = disabledValues.has(option.value);
          const showEditState =
            isSelected &&
            selectionType === "rewardWith" &&
            option.value === upgradeCommissionTierRewardValue &&
            hoveredOptionValue === option.value;

          return (
            <div className="space-y-2" key={option.value}>
              <button
                aria-disabled={isDisabled}
                aria-selected={isSelected}
                className={`flex h-control w-full items-center justify-between rounded-card px-3 text-left text-body transition-colors ${
                  isDisabled
                    ? "cursor-not-allowed text-muted"
                    : isSelected
                      ? "bg-magenta-2 text-magenta-12"
                      : "text-text hover:bg-magenta-3/60"
                }`}
                disabled={isDisabled}
                onClick={() => handleSelectOption(option)}
                onMouseEnter={() => setHoveredOptionValue(option.value)}
                onMouseLeave={() =>
                  setHoveredOptionValue((current) => (current === option.value ? null : current))
                }
                role="option"
                type="button"
              >
                <span>
                  {isSelected ? option.getSummary(draftSelection.fields ?? {}) : option.label}
                </span>
                {isSelected ? (
                  <span className="relative flex items-center justify-center">
                    {showEditState ? (
                      <>
                        <EditIcon className="h-5 w-5 text-text-secondary" />
                        <ModalTooltip id={`${saveTooltipId}-edit`} message={editTooltipMessage} />
                      </>
                    ) : (
                      <CheckIcon className="h-6 w-6 text-magenta-12" />
                    )}
                  </span>
                ) : null}
              </button>

              {isSelected && option.fields.length > 0 ? (
                <div className={fieldLayout}>
                  {option.fields.map((field, fieldIndex) => {
                    const value = draftSelection?.fields?.[field.key];
                    const isNestedSelectOpen =
                      activeNestedSelect?.selectionType === selectionType &&
                      activeNestedSelect?.fieldKey === field.key;
                    const toggleNestedSelect = () => onNestedSelectToggle(field.key);

                    return field.kind === "select" ? (
                      <NestedFieldSelect
                        field={field}
                        isOpen={isNestedSelectOpen}
                        key={field.key}
                        onChange={handleFieldChange}
                        onClose={toggleNestedSelect}
                        onToggle={toggleNestedSelect}
                        value={value}
                      />
                    ) : (
                      <NestedFieldInput
                        autoFocus={fieldIndex === 0}
                        field={field}
                        key={field.key}
                        onChange={handleFieldChange}
                        value={value}
                      />
                    );
                  })}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {showActions ? (
        <div className="relative mt-3 flex gap-3">
          <button
            className="flex h-control flex-1 items-center justify-center rounded-button border border-border bg-white text-body text-text transition-colors hover:bg-surface-hover"
            onClick={onCancel}
            type="button"
          >
            Cancel
          </button>
          <button
            aria-describedby={!canSave && showSaveTooltip ? saveTooltipId : undefined}
            aria-disabled={!canSave}
            className={`flex h-control flex-1 items-center justify-center rounded-button text-body text-white transition-colors ${
              canSave ? "bg-primary hover:bg-magenta-11" : "cursor-not-allowed bg-magenta-10/80"
            }`}
            onBlur={!canSave ? onHideSaveTooltip : undefined}
            onClick={handleSaveClick}
            onFocus={!canSave ? onShowSaveTooltip : undefined}
            onMouseEnter={!canSave ? onShowSaveTooltip : undefined}
            onMouseLeave={!canSave ? onHideSaveTooltip : undefined}
            type="button"
          >
            Save
          </button>
          {showSaveTooltip ? <ModalTooltip id={saveTooltipId} message={saveTooltipMessage} /> : null}
        </div>
      ) : null}
    </div>
  );
};

export default DropdownMenu;
