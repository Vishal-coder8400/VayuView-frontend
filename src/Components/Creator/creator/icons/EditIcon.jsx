import React from "react";

function EditIcon({ color = "black", size = 28 }) {
  return (
    <svg
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        fill={color ? color : "currentColor"}
        d="M6.414 15.89L16.556 5.748l-1.414-1.414L5 14.476v1.414h1.414zm.829 2H3v-4.243L14.435 2.212a1 1 0 011.414 0l2.829 2.829a1 1 0 010 1.414L7.243 17.89zM3 19.89h18v2H3v-2z"
      ></path>
    </svg>
  );
}

export default EditIcon;
