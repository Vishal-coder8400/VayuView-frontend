/* LIBRARIES */
import Tippy from "@tippyjs/react";

/* STATIC IMPORTS */
import "tippy.js/dist/backdrop.css";
import "tippy.js/animations/shift-away.css";

/**
 * @param {props} props contains content , children
 * @returns a tooltip component
 */
const ToolTip = (props) => {
  return (
    <Tippy
      key={props?.tKey}
      content={props.content}
      animation={"shift-away"}
      duration={200}
    >
      {props.children}
    </Tippy>
  );
};
export default ToolTip;
