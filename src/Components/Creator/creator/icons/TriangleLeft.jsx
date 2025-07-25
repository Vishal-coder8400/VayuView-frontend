import React from "react";

function TriangleLeft({ color = "black", size = 18 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="none"
      viewBox="0 0 15 15"
    >
      <path fill={color} d="M9 4v7L4.5 7.5 9 4z"></path>
    </svg>
  );
}

export default TriangleLeft;
