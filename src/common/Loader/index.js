import React from "react";

/* STATIC IMPORTS */
import "./style.scss";

/**
 * @param {boolean} props.loader      help to show the loading indicator
 * @param {string}  props.loaderLabel display name 
 * @returns the loader component when the user logged in & display the loading icons
 */
const LoaderComponent = (props) => {
  const isLoaderVisible = props.loader;
  const loaderLabel = props.loaderLabel;
  return isLoaderVisible === true ? (
    <div
      className="loader-body"
      style={{
        position: "fixed",
        display: "block",
        zIndex: 1060,
        backgroundColor:  "white",
        color: "black" ,
        width: "100%",
        height: "100%",
        opacity: "0.9",
        top: 0,
        left: 0,
        right: 0,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      <div className="page-loader-wrapper content">
        <div className="loading-transition">
          <div className="loaderBar"></div>
        </div>
        <p className={"loaderLabel mt-2"}>{loaderLabel}</p>
      </div>
    </div>
  ) : (
    <></>
  );
};

export default LoaderComponent;