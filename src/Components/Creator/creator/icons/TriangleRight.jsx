import React from "react";

function TriangleRight({ color = "black", size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 15 15"
    >
      <path fill={color} d="M6 11V4l4.5 3.5L6 11z"></path>
    </svg>
  );
}

export default TriangleRight;
