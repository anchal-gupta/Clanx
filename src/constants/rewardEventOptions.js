import {
  createSelectionDraft,
  getSelectionLabel,
  isSelectionComplete,
} from "./selectionHelpers";

const durationOptions = [
  { label: "14 days", value: "14 days" },
  { label: "1 month", value: "1 month" },
  { label: "2 months", value: "2 months" },
  { label: "3 months", value: "3 months" },
  { label: "1 year", value: "1 year" },
];

const rewardEventOptions = [
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
    getSummary: (fields) =>
      fields.amount ? `Cross $${fields.amount} in sales` : "Cross $X in sales",
    label: "Cross $X in sales",
    value: "cross-sales",
  },
  {
    fieldLayout: "two-column",
    fields: [
      {
        inputMode: "numeric",
        key: "count",
        kind: "input",
        placeholder: "e.g. 4",
      },
      {
        key: "duration",
        kind: "select",
        options: durationOptions,
        placeholder: "Select duration",
      },
    ],
    getSummary: (fields) => {
      const count = fields.count?.trim();
      const duration = fields.duration?.label ?? fields.duration?.trim();
      if (count && duration) {
        return `Posts ${count} times every ${duration}`;
      }

      if (count) {
        return `Posts ${count} times every Y period`;
      }

      if (duration) {
        return `Posts X times every ${duration}`;
      }

      return "Posts X times every Y period";
    },
    label: "Posts X times every Y period",
    value: "posts-period",
  },
  {
    fields: [],
    getSummary: () => "Is Onboarded",
    label: "Is Onboarded",
    value: "onboarded",
  },
];

export const createRewardEventDraft = (optionValue = null) =>
  createSelectionDraft(rewardEventOptions, optionValue);

export const getRewardEventLabel = (selection) => getSelectionLabel(rewardEventOptions, selection);

export const isRewardEventComplete = (selection) => isSelectionComplete(rewardEventOptions, selection);

export { durationOptions };
export default rewardEventOptions;
