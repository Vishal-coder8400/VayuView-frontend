import React from "react";
import ReusableOptions from "./ReusableOptions";

const LineToolProperties = (props) => {
  const defaultOptions = [

    {
      title: "Line Color",
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
      type: "number",
      key: "skewX",
    },
    {
      title: "Skew-Y",
      type: "number",
      key: "skewY",
    },
    // Add more objects as needed
  ];
  return (
    <div className="p-4">
      <div className="flex flex-col flex-wrap gap-2">
        <ReusableOptions defaultOptions={defaultOptions} {...props} />
      </div>
    </div>
  );
};

export default LineToolProperties;
