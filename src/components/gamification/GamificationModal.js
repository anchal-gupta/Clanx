import { format } from "date-fns";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import rewardEventOptions from "../../constants/rewardEventOptions";
import rewardWithOptions, {
  isUpgradeCommissionTierDisabledForRewardEvent,
  upgradeCommissionTierRewardValue,
} from "../../constants/rewardWithOptions";
import {
  clearTooltip,
  closeCalendar,
  closeMenu,
  closeNestedSelect,
  closeNestedPanel,
  openCalendar,
  openMenu,
  openNestedSelect,
  openNestedPanel,
  saveSelection,
  selectActiveMenu,
  selectActiveNestedSelect,
  selectActiveNestedPanel,
  selectCalendarMonth,
  selectCanCreate,
  selectCreateRewardTooltipMessage,
  selectIsCalendarOpen,
  selectIsTimeBound,
  selectRewardEventButtonLabel,
  selectRewardEventDraft,
  selectRewardEventSaved,
  selectRewardWithButtonLabel,
  selectRewardWithDraft,
  selectSelectedEndDate,
  selectSelectionSaveTooltipMessage,
  selectTooltip,
  setCalendarMonth,
  setSelectionDraft,
  setSelectedEndDate,
  showTooltip,
  showToast,
  toggleTimeBound,
  cancelSelection,
} from "../../store/gamificationSlice";
import GamificationModalHeader from "./GamificationModalHeader";
import ModalActions from "./ModalActions";
import DropdownMenu from "./DropdownMenu";
import RewardTimeBoundRow from "./RewardTimeBoundRow";
import SelectField from "./SelectField";

const toDateString = (date) => format(date, "yyyy-MM-dd");

const GamificationModal = ({ onClose }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  const activeMenuRef = useRef(null);
  const activeNestedSelectRef = useRef(null);
  const activeNestedPanelRef = useRef(null);
  const isCalendarOpenRef = useRef(false);
  const activeMenu = useSelector(selectActiveMenu);
  const activeNestedSelect = useSelector(selectActiveNestedSelect);
  const activeNestedPanel = useSelector(selectActiveNestedPanel);
  const calendarMonth = useSelector(selectCalendarMonth);
  const canCreate = useSelector(selectCanCreate);
  const createTooltipMessage = useSelector(selectCreateRewardTooltipMessage);
  const isCalendarOpen = useSelector(selectIsCalendarOpen);
  const isTimeBound = useSelector(selectIsTimeBound);
  const rewardEventButtonLabel = useSelector(selectRewardEventButtonLabel);
  const rewardEventDraft = useSelector(selectRewardEventDraft);
  const rewardEventSaved = useSelector(selectRewardEventSaved);
  const rewardEventSaveTooltipMessage = useSelector((state) =>
    selectSelectionSaveTooltipMessage(state, "rewardEvent"),
  );
  const rewardWithButtonLabel = useSelector(selectRewardWithButtonLabel);
  const rewardWithDraft = useSelector(selectRewardWithDraft);
  const rewardWithSaveTooltipMessage = useSelector((state) =>
    selectSelectionSaveTooltipMessage(state, "rewardWith"),
  );
  const selectedEndDate = useSelector(selectSelectedEndDate);
  const tooltip = useSelector(selectTooltip);

  useEffect(() => {
    activeMenuRef.current = activeMenu;
  }, [activeMenu]);

  useEffect(() => {
    activeNestedSelectRef.current = activeNestedSelect;
  }, [activeNestedSelect]);

  useEffect(() => {
    activeNestedPanelRef.current = activeNestedPanel;
  }, [activeNestedPanel]);

  useEffect(() => {
    isCalendarOpenRef.current = isCalendarOpen;
  }, [isCalendarOpen]);

  useEffect(() => {
    if (!tooltip) {
      return undefined;
    }

    const timeout = window.setTimeout(() => {
      dispatch(clearTooltip());
    }, 2200);

    return () => window.clearTimeout(timeout);
  }, [dispatch, tooltip]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (activeMenuRef.current) {
        dispatch(closeMenu());
        return;
      }

      if (isCalendarOpenRef.current) {
        dispatch(closeCalendar());
        return;
      }

      if (activeNestedPanelRef.current) {
        dispatch(closeNestedPanel());
        return;
      }

      if (activeNestedSelectRef.current) {
        dispatch(closeNestedSelect());
        return;
      }

      onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    modalRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [dispatch, onClose]);

  const handleBackdropClick = () => {
    if (activeNestedPanelRef.current) {
      dispatch(closeNestedPanel());
      return;
    }

    if (activeMenuRef.current) {
      dispatch(closeMenu());
      return;
    }

    onClose();
  };

  const handleToggleMenu = (selectionType) => {
    if (activeMenu === selectionType) {
      dispatch(closeMenu());
      return;
    }

    dispatch(openMenu(selectionType));
  };

  const handleDraftChange = (selectionType, draft) => {
    dispatch(setSelectionDraft({ draft, selectionType }));
  };

  const handleSaveSelection = (selectionType) => {
    dispatch(saveSelection(selectionType));
  };

  const handleCancelSelection = (selectionType) => {
    dispatch(cancelSelection(selectionType));
  };

  const handleShowSaveTooltip = (selectionType) => {
    dispatch(showTooltip({ kind: "selectionSave", selectionType }));
  };

  const handleToggleNestedSelect = (selectionType, fieldKey) => {
    if (
      activeNestedSelect?.selectionType === selectionType &&
      activeNestedSelect.fieldKey === fieldKey
    ) {
      dispatch(closeNestedSelect());
      return;
    }

    dispatch(openNestedSelect({ fieldKey, selectionType }));
  };

  const handleOpenNestedPanel = (selectionType, panelKey) => {
    dispatch(openNestedPanel({ panelKey, selectionType }));
  };

  const handleCalendarToggle = () => {
    if (isCalendarOpen) {
      dispatch(closeCalendar());
      return;
    }

    dispatch(openCalendar());
  };

  const handleMonthChange = (date) => {
    dispatch(setCalendarMonth(toDateString(date)));
  };

  const handleDateSelect = (date) => {
    dispatch(setSelectedEndDate(toDateString(date)));
  };

  const showRewardEventSaveTooltip =
    tooltip?.kind === "selectionSave" && tooltip.selectionType === "rewardEvent";
  const showRewardWithSaveTooltip =
    tooltip?.kind === "selectionSave" && tooltip.selectionType === "rewardWith";
  const showCreateRewardTooltip = tooltip?.kind === "createReward";

  const handleCreateReward = () => {
    onClose();
    dispatch(showToast({ message: "Reward Created!" }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/15 px-4 py-8 backdrop-blur-[2px] md:items-center"
      onMouseDown={handleBackdropClick}
    >
      <div
        aria-labelledby="gamification-modal-title"
        aria-modal="true"
        className="relative w-full max-w-modal rounded-modal bg-white p-6 shadow-modal outline-none"
        onMouseDown={(event) => event.stopPropagation()}
        ref={modalRef}
        role="dialog"
        tabIndex={-1}
      >
        <div className="flex flex-col gap-6">
          <GamificationModalHeader onClose={onClose} />
          <div className="flex flex-col gap-4">
            <SelectField
              isOpen={activeMenu === "rewardEvent"}
              label="Reward event"
              onToggle={() => handleToggleMenu("rewardEvent")}
              placeholder="Select an event"
              selectedLabel={rewardEventButtonLabel}
            >
              <DropdownMenu
                activeNestedSelect={activeNestedSelect}
                activeNestedPanel={activeNestedPanel}
                disabledOptionValues={[]}
                draftSelection={rewardEventDraft}
                onCancel={() => handleCancelSelection("rewardEvent")}
                onDraftChange={(draft) => handleDraftChange("rewardEvent", draft)}
                onNestedSelectToggle={(fieldKey) => handleToggleNestedSelect("rewardEvent", fieldKey)}
                onCloseNestedPanel={() => dispatch(closeNestedPanel())}
                onOpenNestedPanel={({ panelKey, selectionType }) =>
                  handleOpenNestedPanel(selectionType, panelKey)
                }
                onHideSaveTooltip={() => dispatch(clearTooltip())}
                onSave={() => handleSaveSelection("rewardEvent")}
                onShowSaveTooltip={() => handleShowSaveTooltip("rewardEvent")}
                options={rewardEventOptions}
                saveTooltipMessage={rewardEventSaveTooltipMessage}
                showSaveTooltip={showRewardEventSaveTooltip}
                selectionType="rewardEvent"
              />
            </SelectField>
            <SelectField
              isOpen={activeMenu === "rewardWith"}
              label="Reward with"
              onToggle={() => handleToggleMenu("rewardWith")}
              placeholder="Select a reward"
              selectedLabel={rewardWithButtonLabel}
            >
              <DropdownMenu
                activeNestedSelect={activeNestedSelect}
                activeNestedPanel={activeNestedPanel}
                disabledOptionValues={
                  isUpgradeCommissionTierDisabledForRewardEvent(rewardEventSaved?.optionValue)
                    ? [upgradeCommissionTierRewardValue]
                    : []
                }
                draftSelection={rewardWithDraft}
                onCancel={() => handleCancelSelection("rewardWith")}
                onDraftChange={(draft) => handleDraftChange("rewardWith", draft)}
                onNestedSelectToggle={(fieldKey) => handleToggleNestedSelect("rewardWith", fieldKey)}
                onCloseNestedPanel={() => dispatch(closeNestedPanel())}
                onOpenNestedPanel={({ panelKey, selectionType }) =>
                  handleOpenNestedPanel(selectionType, panelKey)
                }
                onHideSaveTooltip={() => dispatch(clearTooltip())}
                onSave={() => handleSaveSelection("rewardWith")}
                onShowSaveTooltip={() => handleShowSaveTooltip("rewardWith")}
                options={rewardWithOptions}
                saveTooltipMessage={rewardWithSaveTooltipMessage}
                showSaveTooltip={showRewardWithSaveTooltip}
                selectionType="rewardWith"
              />
            </SelectField>
            <RewardTimeBoundRow
              calendarMonth={calendarMonth}
              enabled={isTimeBound}
              isCalendarOpen={isCalendarOpen}
              onDateChange={handleDateSelect}
              onMonthChange={handleMonthChange}
              onToggle={() => dispatch(toggleTimeBound())}
              onToggleCalendar={handleCalendarToggle}
              selectedDate={selectedEndDate}
            />
          </div>
          <ModalActions
            canCreate={canCreate}
            onBlockedAttempt={() => dispatch(showTooltip({ kind: "createReward" }))}
            onCancel={onClose}
            onCreate={handleCreateReward}
            onHideTooltip={() => dispatch(clearTooltip())}
            onShowTooltip={() => dispatch(showTooltip({ kind: "createReward" }))}
            showTooltip={showCreateRewardTooltip}
            tooltipMessage={createTooltipMessage}
          />
        </div>
      </div>
    </div>
  );
};

export default GamificationModal;
