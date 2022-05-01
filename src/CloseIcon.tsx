type CloseIconProps = {
  className?: string;
  color?: string;
};

const CloseIcon = ({ className = "", color = "white" }: CloseIconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className={`h-6 w-6 ${className} text-${color}`}
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export default CloseIcon;
