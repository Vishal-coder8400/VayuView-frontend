import React, { useState } from "react";
import "./TabHeader.css"; // Import your CSS file

const TabHeader = ({tabs, selectedTab, setSelectedTab}) => {
  return (
    <div className="tab-container">
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${selectedTab === index ? "active-tab" : ""}`}
            onClick={() => setSelectedTab(index)}
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabHeader;
