import React from 'react';
import './ShimmerLoader.css'; // Import CSS for styles

const ShimmerLoader = () => {
  return (
    <div className="loading-bar-container">
    <h1 className="loading-heading">Loading...</h1>
    <div className="loading-progress-bar">
      <div className="loading-progress"></div>
    </div>
    <h2 className="loading-subheading">Please wait...</h2>
  </div>
  );
};

export default ShimmerLoader;
