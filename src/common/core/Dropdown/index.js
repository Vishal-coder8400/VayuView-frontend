import React, { useState } from 'react';
import './style.scss'
import { MapIcon } from '../../icons/MapIcon';
import { DownArrow } from '../../icons/DownArrow';

export const Dropdown = ({ options, selectedOption, setSelectedOption, optionName, icon, inputLike }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <div className={"dropdown"}>
      <div className={`${inputLike?"dropdown-input": 'dropdown-toggle'} ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
        {icon} <span style={{color: '#b5b4b4', marginRight: '10px'}}>{optionName}{optionName?":":""} </span><span style={{width: '50%'}}>{selectedOption} </span><DownArrow/>
      </div>
      {isOpen && (
        <>
        <ul className="dropdown-list">
          {options.map((option, index) => (
            <li key={index} onClick={() => handleOptionClick(option)}>
              {option}
            </li>
          ))}
        </ul>
        </>
      )}
    </div>
  );
};