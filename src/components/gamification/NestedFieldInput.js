const NestedFieldInput = ({ autoFocus = false, field, value, onChange }) => {
  const isNumericField = field.inputMode === "numeric";

  return (
    <label className="flex h-control items-stretch overflow-hidden rounded-button border-2 border-primary bg-white">
      {field.prefix ? (
        <span className="flex w-control items-center justify-center border-r border-primary/20 font-body text-body text-text-secondary">
          {field.prefix}
        </span>
      ) : null}
      <input
        className={`min-w-0 flex-1 bg-transparent px-3 font-body text-body text-text outline-none placeholder:text-muted ${
          isNumericField ? "appearance-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" : ""
        }`}
        autoFocus={autoFocus}
        inputMode={field.inputMode ?? "text"}
        min={isNumericField ? 0 : undefined}
        onChange={(event) => {
          const nextValue = isNumericField ? event.target.value.replace(/\D/g, "") : event.target.value;
          onChange(field.key, nextValue);
        }}
        placeholder={field.placeholder}
        step={isNumericField ? 1 : undefined}
        type={isNumericField ? "number" : "text"}
        value={value ?? ""}
      />
      {field.suffix ? (
        <span className="flex w-control items-center justify-center border-l border-primary/20 font-body text-body text-text-secondary">
          {field.suffix}
        </span>
      ) : null}
    </label>
  );
};

export default NestedFieldInput;
