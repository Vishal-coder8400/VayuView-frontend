import React from "react";

const TextIcon = ({ color = "black", size = 20 }) => {
  return (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill={color} d="M13 6V21H11V6H5V4H19V6H13Z"></path>
    </svg>
  );
};

export default TextIcon;
