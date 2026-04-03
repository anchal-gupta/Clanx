import { useEffect, useRef } from "react";
import ChevronIcon from "./icons/ChevronIcon";

const NestedFieldSelect = ({ field, isOpen, onChange, onClose, onToggle, value }) => {
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleOutsideClick = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        onClose();
      }
    };

    window.addEventListener("mousedown", handleOutsideClick);
    return () => window.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, onClose]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        className={`flex h-control w-full items-center justify-between rounded-button border bg-white px-3 text-left transition-colors ${
          isOpen ? "border-2 border-primary" : "border-border"
        }`}
        onClick={onToggle}
        type="button"
      >
        <span className={`font-body text-body ${value ? "text-text" : "text-muted"}`}>
          {value?.label ?? field.placeholder}
        </span>
        <ChevronIcon className={`h-5 w-5 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>
      {isOpen ? (
        <div className="absolute left-0 top-full z-40 mt-1.5 w-full rounded-field border border-border bg-white p-1 shadow-popup">
          <div className="space-y-1">
            {field.options.map((option) => {
              const selected = value?.value === option.value;

              return (
                <button
                  className={`flex h-control w-full items-center rounded-card px-3 text-left text-body transition-colors ${
                    selected ? "bg-magenta-2 text-magenta-12" : "text-text hover:bg-magenta-3/60"
                  }`}
                  key={option.value}
                  onClick={() => {
                    onChange(field.key, option);
                    onClose();
                  }}
                  type="button"
                >
                  {option.label}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NestedFieldSelect;
