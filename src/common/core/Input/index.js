import React from 'react';
import './style.scss'; // Import the SCSS file for styling
import { FaSearch } from 'react-icons/fa'; // Import the search icon from react-icons library

function InputWithIcon({ placeholder, value, onChange }) {
  return (
    <div className="input-with-icon">
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <FaSearch className="search-icon" />
    </div>
  );
}

export default InputWithIcon;
