import React from "react";

function DisplayIcon({ color = "black", size = 28 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
    >
      <path
        fill={color}
        d="M2 4c0-.552.455-1 .992-1h18.016c.548 0 .992.445.992 1v14c0 .552-.455 1-.992 1H2.992A.994.994 0 012 18V4zm2 1v12h16V5H4zm1 15h14v2H5v-2z"
      ></path>
    </svg>
  );
}

export default DisplayIcon;
