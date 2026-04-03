import {
  flatBonusRewardValue,
  upgradeCommissionTierRewardValue,
} from "./rewardWithOptions";

export const createRewardTooltipMessage = "Choose a reward trigger and a reward to continue";
export const endDateTooltipMessage = "Choose reward end date to continue";
export const commissionTierTooltipMessage = "Select a commission tier to continue";
export const editTooltipMessage = "Edit";

export const getSelectionSaveTooltipId = (selectionType) => `${selectionType}-save-tooltip`;

export const getSelectionSaveTooltip = (selectionType, selection) => {
  if (!selection?.optionValue) {
    return createRewardTooltipMessage;
  }

  if (selectionType === "rewardEvent") {
    if (selection.optionValue === "cross-sales") {
      return selection.fields?.amount?.trim()
        ? null
        : "Enter the sales target amount to continue";
    }

    if (selection.optionValue === "posts-period") {
      const count = selection.fields?.count?.trim();
      const duration = selection.fields?.duration?.label ?? selection.fields?.duration?.trim();

      if (count && duration) {
        return null;
      }

      if (!count && !duration) {
        return "Enter the post count and duration to continue";
      }

      if (!count) {
        return "Enter the post count to continue";
      }

      return "Select the duration to continue";
    }
  }

  if (selectionType === "rewardWith") {
    if (selection.optionValue === flatBonusRewardValue) {
      return selection.fields?.amount?.trim() ? null : "Enter the bonus amount to continue";
    }

    if (selection.optionValue === upgradeCommissionTierRewardValue) {
      return selection.fields?.tier?.label ? null : commissionTierTooltipMessage;
    }
  }

  return null;
};

export const getCreateRewardTooltip = ({
  hasRewardSelections,
  isTimeBound,
  hasEndDate,
}) => {
  if (!hasRewardSelections) {
    return createRewardTooltipMessage;
  }

  if (isTimeBound && !hasEndDate) {
    return endDateTooltipMessage;
  }

  return createRewardTooltipMessage;
};
