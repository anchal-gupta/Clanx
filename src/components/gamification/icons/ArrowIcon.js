const ArrowIcon = ({ className = "", direction = "right" }) => {
  const isLeft = direction === "left";
  const path = isLeft
    ? "M18.5 12H5.5m0 0 6-6m-6 6 6 6"
    : "M5.5 12h13m0 0-6-6m6 6-6 6";

  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <path
        d={path}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
};

export default ArrowIcon;
