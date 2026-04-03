const NestedFieldInput = ({ autoFocus = false, field, value, onChange }) => (
  <label className="flex h-control items-stretch overflow-hidden rounded-button border border-primary bg-white">
    {field.prefix ? (
      <span className="flex w-control items-center justify-center border-r border-primary/20 font-body text-body text-text-secondary">
        {field.prefix}
      </span>
    ) : null}
    <input
      className="min-w-0 flex-1 bg-transparent px-3 font-body text-body text-text outline-none placeholder:text-muted"
      autoFocus={autoFocus}
      inputMode={field.inputMode ?? "text"}
      onChange={(event) => onChange(field.key, event.target.value)}
      placeholder={field.placeholder}
      type="text"
      value={value ?? ""}
    />
    {field.suffix ? (
      <span className="flex w-control items-center justify-center border-l border-primary/20 font-body text-body text-text-secondary">
        {field.suffix}
      </span>
    ) : null}
  </label>
);

export default NestedFieldInput;
