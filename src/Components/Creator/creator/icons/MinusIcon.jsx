import React from "react";

const MinusIcon = ({ color = "black", size = 20 }) => {
  return (
    <svg
      height={size}
      width={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill={color ? color : "currentColor"} d="M5 11v2h14v-2H5z"></path>
    </svg>
  );
};

export default MinusIcon;
