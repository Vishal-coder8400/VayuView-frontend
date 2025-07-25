import React from "react";
import {Tooltip} from "react-tooltip";

const TooltipContent = ({ param, data }) => (
  <div>
    {param}
    {data && data?.map((range, index) => (
      <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: "5px" }}>
        <span
          style={{
            display: "inline-block",
            width: "15px",
            height: "15px",
            backgroundColor: range.color,
            marginRight: "5px",
            borderRadius: "6px",
          }}
        ></span>
        <span>{`${range.min} - ${range.max}`}</span>
      </div>
    ))}
  </div>
);

const TooltipContainer = ({children, colorData, param}) => {
  return (
    <div style={{ textAlign: "center", }}>
      <span data-tip data-tooltip-id={param}>
        {children}
      </span>
      
      <Tooltip id={param} place="top" effect="solid" style={{zIndex: 100000000}}>
        <>
        <TooltipContent data={colorData} param={param}/>
        </>
      </Tooltip>
    </div>
  );
};

export default TooltipContainer;
