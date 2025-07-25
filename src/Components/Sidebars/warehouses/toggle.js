import React, { useState } from "react";

const ToggleSwitch = (props) => {
  // State to manage the toggle (false for Single Order, true for Bulk)
  const [isBulk, setIsBulk] = useState(props.data);

  // Function to handle the toggle
  const handleToggle = () => {
    setIsBulk(!isBulk);
    props.setData(!isBulk)
  };

  return (
    <label className="flex items-center cursor-pointer">
      {/* Toggle */}
      <div className="relative">
        {/* Input */}
        <input type="checkbox" id="toggle" className="sr-only" onChange={handleToggle} checked={isBulk} />
        {/* Line */}
        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
        {/* Dot */}
        <div className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${isBulk ? 'transform translate-x-6' : ''}`}></div>
      </div>
      {/* Label */}
      <div className="ml-3 text-gray-700 font-medium">
        {isBulk ? 'Bulk' : 'Single Order'}
      </div>
    </label>
  );
};

export default ToggleSwitch;
