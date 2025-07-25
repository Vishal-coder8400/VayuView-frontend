import React, { useState } from "react";
import Sidebar from "react-sidebar";
const RightSidebar = (props) => {
  const {
    children,
    sidebarOpen,
    onSetSidebarOpen,
    sidebarContent = <>No data</>,
  } = props;

  return (
    <Sidebar
      sidebar={sidebarContent}
      open={sidebarOpen}
      onSetOpen={onSetSidebarOpen}
      styles={{
        sidebar: {
          background: "white",
          width: "350px",
          height: "100%",
          padding: "10px",
          position: "fixed",
        },
      }}
      pullRight
    ></Sidebar>
  );
};

export default RightSidebar;
