import React from "react";

const MoveUpDown = (props) => {
  // bring the Object at the top most level
  const onMoveUp = () => {
    props?.editor?.canvas?.bringToFront(props.selectedObjects[0]);
    props?.editor?.canvas?.renderAll();
    // props.editor?.canvas?.requestRenderAll();
  };

  // bring the Object at the top, one by one at the top level
  const moveUp = () => {
    props?.editor?.canvas?.bringForward(props.selectedObjects[0]);
    props?.editor?.canvas?.renderAll();
    // props.editor?.canvas?.requestRenderAll();
  };

  // bring the Object at the bottom most level
  const onMoveDown = () => {
    props?.editor?.canvas?.sendToBack(props.selectedObjects[0]);
    props?.editor?.canvas?.renderAll();
    // props.editor?.canvas?.requestRenderAll();
  };

  // bring the Object at the bottom, one by one at the bottom level
  const moveDown = () => {
    props?.editor?.canvas?.sendBackwards(props.selectedObjects[0]);
    props?.editor?.canvas?.renderAll();
    // props.editor?.canvas?.requestRenderAll();
  };

  return (
    <div className="flex gap-2 p-2 m-2 mb-0">
      <button
        onClick={onMoveUp}
        className="p-2 border border-[#03A9E7] w-[50%] flex justify-center items-center"
      >
        <svg
          height={26}
          width={26}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#03A9E7"
            d="M12.0001 4.83594L5.79297 11.043L7.20718 12.4573L12.0001 7.66436L16.793 12.4573L18.2072 11.043L12.0001 4.83594ZM12.0001 10.4858L5.79297 16.6929L7.20718 18.1072L12.0001 13.3143L16.793 18.1072L18.2072 16.6929L12.0001 10.4858Z"
          ></path>
        </svg>
      </button>
      <button
        onClick={moveUp}
        className="p-2 border border-[#03A9E7] w-[50%] flex justify-center items-center"
      >
        <svg
          height={26}
          width={26}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#03A9E7"
            d="M12 11.8284L9.17154 14.6569L7.75732 13.2426L12 9L16.2426 13.2426L14.8284 14.6569L12 11.8284Z"
          ></path>
        </svg>
      </button>
      <button
        onClick={onMoveDown}
        className="p-2 border border-[#03A9E7] w-[50%] flex justify-center items-center"
      >
        <svg
          height={26}
          width={26}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#03A9E7"
            d="M12.0001 19.1643L18.2072 12.9572L16.793 11.543L12.0001 16.3359L7.20718 11.543L5.79297 12.9572L12.0001 19.1643ZM12.0001 13.5144L18.2072 7.30728L16.793 5.89307L12.0001 10.686L7.20718 5.89307L5.79297 7.30728L12.0001 13.5144Z"
          ></path>
        </svg>
      </button>
      <button
        onClick={moveDown}
        className="p-2 border border-[#03A9E7] w-[50%] flex justify-center items-center"
      >
        <svg
          height={26}
          width={26}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="#03A9E7"
            d="M12 15.0006L7.75732 10.758L9.17154 9.34375L12 12.1722L14.8284 9.34375L16.2426 10.758L12 15.0006Z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default MoveUpDown;
