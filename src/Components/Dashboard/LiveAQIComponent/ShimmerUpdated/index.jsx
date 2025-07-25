import React from 'react';
import './ShimmerLoader.css'; // Import CSS for styles

const ShimmerLoader = () => {
  return (
    <div className="updated-loading-bar-container">
    <h1 className="updated-loading-heading">Loading...</h1>
    <div className="updated-loading-progress-bar">
      <div className="updated-loading-progress"></div>
    </div>
    <h2 className="updated-loading-subheading">Please wait...</h2>
  </div>
  );
};

export default ShimmerLoader;
