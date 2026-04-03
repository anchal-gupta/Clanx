import ChevronIcon from "./icons/ChevronIcon";

const SelectField = ({ children, isOpen, label, onToggle, placeholder, selectedLabel }) => {
  const hasValue = Boolean(selectedLabel);

  return (
      <div className="space-y-2">
      <div className="flex items-center gap-0.5 text-label">
        <span className="font-body text-text-secondary">{label}</span>
        <span className="font-body text-danger">*</span>
      </div>
      <div className="relative">
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className={`flex h-control w-full items-center justify-between rounded-button bg-white px-4 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20 ${
            isOpen ? "border-2 border-primary" : "border border-border"
          }`}
          onClick={onToggle}
          type="button"
        >
          <span className={`font-body text-body ${hasValue ? "text-text" : "text-muted"}`}>
            {selectedLabel || placeholder}
          </span>
          <ChevronIcon className={`h-5 w-5 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen ? children : null}
      </div>
    </div>
  );
};

export default SelectField;
