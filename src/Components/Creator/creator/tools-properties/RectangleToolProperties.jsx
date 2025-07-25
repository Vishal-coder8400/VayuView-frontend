import React, { useState } from "react";
import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/css";
import ReusableOptions from "./ReusableOptions";

const RectangleToolProperties = (props) => {
  // const [color, setColor] = useColor("");
  // const [stroke, setStroke] = useColor("");

  const defaultOptions = [
    {
      title: "Background Colour",
      type: "color",
      key: "fill",
    },
    {
      title: "Stroke Color",
      type: "color",
      key: "stroke",
    },
    {
      title: "Stroke Width",
      type: "number",
      key: "strokeWidth",
    },
    {
      title: "Angle",
      type: "number",
      key: "angle",
    },
    // {
    //   title: "Left",
    //   type: "range",
    //   key: "left",
    // },
    // {
    //   title: "Top",
    //   type: "range",
    //   key: "top",
    // },
    // {
    //   title: "Scale",
    //   type: "range",
    //   key: "scale",
    // },
    {
      title: "Skew-X",
      type: "range",
      key: "skewX",
    },
    {
      title: "Skew-Y",
      type: "range",
      key: "skewY",
    },
    // Add more objects as needed
  ];

  const updateObjectProperties = (canvas, newProperties, props) => {
    const activeObject = canvas.getActiveObject();

    if (activeObject) {
      // Update the object properties
      activeObject.set({ ...activeObject.toObject(), ...newProperties });

      // Trigger canvas render
      canvas.renderAll();

      if (props?.currentInstance >= 0) {
        const updatedData = canvas.toJSON().objects;
        props._updateInstance({
          id: props.currentInstance,
          instance: props.currentInstance,
          data: updatedData,
        });
        console.log("🚀 ~ updateObjectProperties ~ _updateInstance:", props._updateInstance)
      }
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col flex-wrap gap-2">
        <ReusableOptions defaultOptions={defaultOptions} {...props} />
      </div>
    </div>
  );
};

export default RectangleToolProperties;
