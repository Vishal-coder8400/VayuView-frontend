import React from "react";

const AddIcon = ({ color = "black", size = 18 }) => {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path fill={color} d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path>
    </svg>
  );
};

export default AddIcon;
