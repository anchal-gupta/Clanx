export const getSelectedOption = (options, optionValue) =>
  options.find((option) => option.value === optionValue) ?? null;

export const createSelectionDraft = (options, optionValue = null) => {
  const option = getSelectedOption(options, optionValue);

  if (!option) {
    return { optionValue: null, fields: {} };
  }

  const fields = {};

  option.fields.forEach((field) => {
    fields[field.key] = field.defaultValue ?? "";
  });

  return { optionValue: option.value, fields };
};

export const getSelectionLabel = (options, selection) => {
  if (!selection?.optionValue) {
    return null;
  }

  const option = getSelectedOption(options, selection.optionValue);

  if (!option) {
    return null;
  }

  if (typeof option.getSummary === "function") {
    return option.getSummary(selection.fields ?? {});
  }

  return option.label;
};

export const isSelectionComplete = (options, selection) => {
  if (!selection?.optionValue) {
    return false;
  }

  const option = getSelectedOption(options, selection.optionValue);

  if (!option) {
    return false;
  }

  return option.fields.every((field) => {
    const value = selection.fields?.[field.key];
    return value !== undefined && value !== null && `${value}`.trim() !== "";
  });
};
