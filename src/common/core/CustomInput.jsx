import React from "react";

const CustomInput = ({
  placeholder,
  value,
  onChange,
  number,
  type = "text",
  autoFocus = false,
  disabled,
  countryCodeReq,
}) => {
  return (
    <>
      {countryCodeReq ? (
        <>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 4,
                borderTopLeftRadius: '100px',
                borderBottomLeftRadius: '100px',
                border: "1px solid #d3d3d3",
              }}
            >
              +91
            </div>
            <input
              type={'number'}
              placeholder={placeholder}
              maxLength={10}
              value={value}
              disabled={disabled}
              onChange={onChange}
              autoFocus={autoFocus}
              onInput={(e) => {
                if (e.target.value.length > 10) {
                  e.target.value = e.target.value.slice(0, 10);
                }
              }}
              style={{ backgroundColor: disabled ? "#d3d3d3" : "white", 
                borderTopRightRadius: '100px',
                borderBottomRightRadius: '100px', }}
              className="transition block w-full pl-4 h-[40px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </>
      ) : (
        <>
          <input
            type={number ? "number" : type}
            placeholder={placeholder}
            value={value}
            disabled={disabled}
            onChange={onChange}
            autoFocus={autoFocus}
            style={{ backgroundColor: disabled ? "#d3d3d3" : "white" }}
            className="transition block w-full pl-4 h-[40px] rounded-[100px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          />
        </>
      )}
    </>
  );
};

export default CustomInput;
