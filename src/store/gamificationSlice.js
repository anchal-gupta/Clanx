import { createSlice } from "@reduxjs/toolkit";
import { addDays, format, startOfDay } from "date-fns";
import {
  createRewardTooltipMessage,
  getCreateRewardTooltip,
  getSelectionSaveTooltip,
} from "../constants/gamificationTooltips";
import {
  createRewardEventDraft,
  getRewardEventLabel,
  isRewardEventComplete,
} from "../constants/rewardEventOptions";
import {
  createRewardWithDraft,
  getRewardWithLabel,
  isRewardWithComplete,
  isUpgradeCommissionTierDisabledForRewardEvent,
  upgradeCommissionTierRewardValue,
} from "../constants/rewardWithOptions";

const toDateString = (date) => format(date, "yyyy-MM-dd");

const getTomorrowDateString = () => toDateString(startOfDay(addDays(new Date(), 1)));

const cloneFieldValue = (value) => {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return value;
  }

  return { ...value };
};

const cloneSelection = (selection) => {
  if (!selection) {
    return null;
  }

  const clonedFields = Object.fromEntries(
    Object.entries(selection.fields ?? {}).map(([key, value]) => [key, cloneFieldValue(value)]),
  );

  return {
    optionValue: selection.optionValue,
    fields: clonedFields,
  };
};

const createSelectionState = () => ({
  draft: null,
  saved: null,
});

const createFlowState = () => ({
  activeMenu: null,
  activeNestedPanel: null,
  rewardEvent: createSelectionState(),
  rewardWith: createSelectionState(),
  isTimeBound: false,
  selectedEndDate: null,
  isCalendarOpen: false,
  calendarMonth: null,
  activeNestedSelect: null,
  tooltip: null,
  toast: null,
});

export const createInitialGamificationState = () => ({
  isModalOpen: false,
  ...createFlowState(),
});

const getSelectionBucket = (state, selectionType) =>
  selectionType === "rewardEvent" ? state.rewardEvent : state.rewardWith;

const getCurrentDraft = (state, selectionType) => getSelectionBucket(state, selectionType).draft;

const clearIncompatibleRewardWithSelection = (state) => {
  if (!isUpgradeCommissionTierDisabledForRewardEvent(state.rewardEvent.saved?.optionValue)) {
    return;
  }

  if (state.rewardWith.saved?.optionValue === upgradeCommissionTierRewardValue) {
    state.rewardWith.saved = null;
  }

  if (state.rewardWith.draft?.optionValue === upgradeCommissionTierRewardValue) {
    state.rewardWith.draft = null;
  }
};

const gamificationSlice = createSlice({
  name: "gamification",
  initialState: createInitialGamificationState(),
  reducers: {
    openModal(state) {
      Object.assign(state, createFlowState());
      state.isModalOpen = true;
    },
    closeModal() {
      return createInitialGamificationState();
    },
    openMenu(state, action) {
      const menu = action.payload;
      state.activeMenu = menu;
      state.activeNestedSelect = null;
      state.activeNestedPanel = null;
      state.isCalendarOpen = false;
      state.tooltip = null;

      if (menu === "rewardEvent") {
        state.rewardEvent.draft = cloneSelection(state.rewardEvent.saved) ?? createRewardEventDraft();
        state.rewardWith.draft = null;
        return;
      }

      state.rewardWith.draft = cloneSelection(state.rewardWith.saved) ?? createRewardWithDraft();
      state.rewardEvent.draft = null;
    },
    closeMenu(state) {
      state.activeMenu = null;
      state.rewardEvent.draft = null;
      state.rewardWith.draft = null;
      state.activeNestedSelect = null;
      state.activeNestedPanel = null;
      state.isCalendarOpen = false;
      state.tooltip = null;
    },
    setSelectionDraft(state, action) {
      const { selectionType, draft } = action.payload;
      getSelectionBucket(state, selectionType).draft = cloneSelection(draft);
      state.activeNestedSelect = null;
      state.tooltip = null;
    },
    cancelSelection(state, action) {
      const selectionType = action.payload;
      getSelectionBucket(state, selectionType).draft = null;
      state.activeMenu = null;
      state.activeNestedSelect = null;
      state.activeNestedPanel = null;
      state.isCalendarOpen = false;
      state.tooltip = null;
    },
    saveSelection(state, action) {
      const selectionType = action.payload;
      const bucket = getSelectionBucket(state, selectionType);

      if (bucket.draft) {
        bucket.saved = cloneSelection(bucket.draft);
        bucket.draft = null;
      }

      if (selectionType === "rewardEvent") {
        clearIncompatibleRewardWithSelection(state);
      }

      state.activeMenu = null;
      state.activeNestedSelect = null;
      state.activeNestedPanel = null;
      state.isCalendarOpen = false;
      state.tooltip = null;
    },
    toggleTimeBound(state) {
      state.isTimeBound = !state.isTimeBound;
      state.isCalendarOpen = false;
      state.tooltip = null;

      if (state.isTimeBound && !state.calendarMonth) {
        state.calendarMonth = state.selectedEndDate ?? getTomorrowDateString();
      }
    },
    openCalendar(state) {
      state.isCalendarOpen = true;
      state.tooltip = null;
      state.calendarMonth = state.selectedEndDate ?? state.calendarMonth ?? getTomorrowDateString();
    },
    closeCalendar(state) {
      state.isCalendarOpen = false;
      state.tooltip = null;
    },
    setCalendarMonth(state, action) {
      state.calendarMonth = action.payload;
    },
    setSelectedEndDate(state, action) {
      state.selectedEndDate = action.payload;
      state.calendarMonth = action.payload;
      state.isCalendarOpen = false;
      state.tooltip = null;
    },
    openNestedSelect(state, action) {
      state.activeNestedSelect = action.payload;
      state.tooltip = null;
    },
    closeNestedSelect(state) {
      state.activeNestedSelect = null;
      state.tooltip = null;
    },
    openNestedPanel(state, action) {
      state.activeNestedPanel = action.payload;
      state.activeNestedSelect = null;
      state.tooltip = null;
    },
    closeNestedPanel(state) {
      state.activeNestedPanel = null;
      state.activeNestedSelect = null;
      state.tooltip = null;
    },
    showTooltip(state, action) {
      state.tooltip = action.payload;
    },
    clearTooltip(state) {
      state.tooltip = null;
    },
    showToast(state, action) {
      state.toast = action.payload;
    },
    clearToast(state) {
      state.toast = null;
    },
  },
});

export const {
  clearTooltip,
  clearToast,
  cancelSelection,
  closeCalendar,
  closeMenu,
  closeModal,
  closeNestedSelect,
  closeNestedPanel,
  openCalendar,
  openMenu,
  openModal,
  openNestedSelect,
  openNestedPanel,
  saveSelection,
  setCalendarMonth,
  setSelectionDraft,
  setSelectedEndDate,
  showTooltip,
  showToast,
  toggleTimeBound,
} = gamificationSlice.actions;

export const selectGamificationState = (state) => state.gamification;
export const selectIsModalOpen = (state) => state.gamification.isModalOpen;
export const selectActiveMenu = (state) => state.gamification.activeMenu;
export const selectRewardEventDraft = (state) => state.gamification.rewardEvent.draft;
export const selectRewardEventSaved = (state) => state.gamification.rewardEvent.saved;
export const selectRewardWithDraft = (state) => state.gamification.rewardWith.draft;
export const selectRewardWithSaved = (state) => state.gamification.rewardWith.saved;
export const selectIsTimeBound = (state) => state.gamification.isTimeBound;
export const selectSelectedEndDate = (state) => state.gamification.selectedEndDate;
export const selectIsCalendarOpen = (state) => state.gamification.isCalendarOpen;
export const selectCalendarMonth = (state) => state.gamification.calendarMonth;
export const selectActiveNestedSelect = (state) => state.gamification.activeNestedSelect;
export const selectActiveNestedPanel = (state) => state.gamification.activeNestedPanel;
export const selectTooltip = (state) => state.gamification.tooltip;
export const selectToast = (state) => state.gamification.toast;

export const selectRewardEventButtonLabel = (state) => {
  const { activeMenu, rewardEvent } = state.gamification;
  const selection = activeMenu === "rewardEvent" ? rewardEvent.draft : rewardEvent.saved;
  return getRewardEventLabel(selection);
};

export const selectRewardWithButtonLabel = (state) => {
  const { activeMenu, rewardWith } = state.gamification;
  const selection = activeMenu === "rewardWith" ? rewardWith.draft : rewardWith.saved;
  return getRewardWithLabel(selection);
};

export const selectCanCreate = (state) => {
  const { isTimeBound, selectedEndDate, rewardEvent, rewardWith } = state.gamification;

  return (
    isRewardEventComplete(rewardEvent.saved) &&
    isRewardWithComplete(rewardWith.saved) &&
    (!isTimeBound || Boolean(selectedEndDate))
  );
};

export const selectCreateRewardTooltipMessage = (state) => {
  const { isTimeBound, selectedEndDate, rewardEvent, rewardWith } = state.gamification;
  const hasRewardSelections =
    isRewardEventComplete(rewardEvent.saved) && isRewardWithComplete(rewardWith.saved);

  return (
    getCreateRewardTooltip({
      hasRewardSelections,
      isTimeBound,
      hasEndDate: Boolean(selectedEndDate),
    }) ?? createRewardTooltipMessage
  );
};

export const selectSelectionSaveTooltipMessage = (state, selectionType) => {
  const draft = getCurrentDraft(state.gamification, selectionType);

  return getSelectionSaveTooltip(selectionType, draft) ?? createRewardTooltipMessage;
};

export const gamificationReducer = gamificationSlice.reducer;
