import {
  createSelectionDraft,
  getSelectionLabel,
  isSelectionComplete,
} from "./selectionHelpers";

export const flatBonusRewardValue = "flat-bonus";
export const upgradeCommissionTierRewardValue = "upgrade-commission-tier";

export const commissionTierOptions = [
  { label: "Bronze", value: "bronze" },
  { label: "Silver", value: "silver" },
  { label: "Gold", value: "gold" },
  { label: "Diamond", value: "diamond" },
  { label: "Platinum", value: "platinum" },
];

export const isUpgradeCommissionTierDisabledForRewardEvent = (rewardEventValue) =>
  rewardEventValue === "posts-period" || rewardEventValue === "onboarded";

const rewardWithOptions = [
  {
    fields: [
      {
        inputMode: "numeric",
        key: "amount",
        kind: "input",
        placeholder: "e.g. 100",
        prefix: "$",
      },
    ],
    getSummary: (fields) => (fields.amount ? `Flat $${fields.amount} bonus` : "Flat $X bonus"),
    label: "Flat $X bonus",
    value: flatBonusRewardValue,
  },
  {
    fields: [
      {
        key: "tier",
        kind: "select",
        options: commissionTierOptions,
        placeholder: "Select a tier",
      },
    ],
    getSummary: (fields) =>
      fields.tier?.label ? `Upgrade to ${fields.tier.label}` : "Upgrade to {Tier Name Here}",
    label: "Upgrade Commission Tier",
    value: upgradeCommissionTierRewardValue,
  },
];

export const createRewardWithDraft = (optionValue = null) =>
  createSelectionDraft(rewardWithOptions, optionValue);

export const getRewardWithLabel = (selection) => getSelectionLabel(rewardWithOptions, selection);

export const isRewardWithComplete = (selection) => isSelectionComplete(rewardWithOptions, selection);

export default rewardWithOptions;
