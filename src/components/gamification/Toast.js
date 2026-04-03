import CheckIcon from "./icons/CheckIcon";

const Toast = ({ message }) => (
  <div
    aria-atomic="true"
    aria-live="polite"
    className="pointer-events-none fixed right-6 top-8 z-[60]"
    role="status"
  >
    <div className="inline-flex w-fit items-center gap-3 rounded-toast bg-tooltip px-4 py-3 shadow-toast">
      <span className="flex h-toast-icon w-toast-icon items-center justify-center rounded-full bg-green-10 text-text">
        <CheckIcon className="h-4 w-4" />
      </span>
      <span className="font-body text-body font-normal text-white">{message}</span>
    </div>
  </div>
);

export default Toast;
