import React, { useState } from "react";
import "./style.scss";

export const Button = ({ text, iconRight, squareOutlined, onClick, customClass }) => {
  return (
    <button className={`${squareOutlined?"squareOutlined":"button-custom"} ${customClass?customClass:''}`} onClick={onClick}>
    {text}
      {iconRight}
    </button>
  );
};
