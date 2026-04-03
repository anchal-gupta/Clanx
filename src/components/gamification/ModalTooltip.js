const ModalTooltip = ({ id, message }) => (
  <div
    id={id}
    className="pointer-events-none absolute right-0 top-full z-20 mt-3 inline-flex w-fit max-w-tooltip rounded-tooltip bg-tooltip px-3.5 py-2.5 text-caption text-white shadow-tooltip"
    role="tooltip"
  >
    {message}
  </div>
);

export default ModalTooltip;
