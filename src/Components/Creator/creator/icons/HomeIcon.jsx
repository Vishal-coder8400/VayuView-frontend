import React from "react";

function HomeIcon({ color = "black", size = 28 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill={color}
        d="M19 21H5a1 1 0 01-1-1v-9H1l10.327-9.388a1 1 0 011.346 0L23 11h-3v9a1 1 0 01-1 1zM6 19h12V9.158l-6-5.455-6 5.455V19zm6-4a2.5 2.5 0 110-5 2.5 2.5 0 010 5z"
      ></path>
    </svg>
  );
}

export default HomeIcon;
