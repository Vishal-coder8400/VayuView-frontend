import React from "react";
import Select from "react-select";

const CustomSelect = ({ onChange, options, value, className }) => {
  const customStyles = {
    control: (baseStyles, state) => ({
      ...baseStyles,
      borderColor: state.isFocused ? "grey" : "primary",
    }),
  };

  return (
    <Select
      styles={customStyles}
      className={`w-full shadow-sm ${className || ""}`}
      onChange={onChange}
      options={options}
      value={value}
    />
  );
};

export default CustomSelect;
