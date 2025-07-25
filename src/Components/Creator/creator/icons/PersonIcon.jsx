const PersonIcon = ({ color, size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 13.75C0.58579 13.75 0.25 13.4142 0.25 13V1C0.25 0.58579 0.58579 0.25 1 0.25H13C13.4142 0.25 13.75 0.58579 13.75 1V13C13.75 13.4142 13.4142 13.75 13 13.75H1ZM4 5.5H1.75V12.25H4V5.5ZM12.25 5.5H5.5V12.25H12.25V5.5ZM12.25 1.75H1.75V4H12.25V1.75Z"
        fill={color ? color : "currentColor"}
      />
    </svg>
  );
};

export default PersonIcon;
