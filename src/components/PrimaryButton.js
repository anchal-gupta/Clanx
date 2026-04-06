import { forwardRef } from "react";

const PrimaryButton = forwardRef(({ children, className = "", disabled = false, onClick, type = "button" }, ref) => (
  <button
    ref={ref}
    className={`h-control w-full max-w-button rounded-button bg-primary px-4 text-body text-primary-foreground transition-colors hover:bg-magenta-11 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-primary/70 ${className}`}
    disabled={disabled}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
));

PrimaryButton.displayName = "PrimaryButton";

export default PrimaryButton;
