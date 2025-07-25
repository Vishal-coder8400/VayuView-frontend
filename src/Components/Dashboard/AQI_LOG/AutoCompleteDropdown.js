import React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const options = ["WHO", "USEPA", "CPCB", "EPA AIR WATCH", "EPA VICTORIA AUSTRALIA", "ISHRAE/ASHRAE"];

const AutoCompleteDropdown = ({colorStandard, setColorStandard, customStyling}) => {
  const handleChange = (event, value) => {
    setColorStandard(value);
    console.log("Selected Option:", value);
  };
  return (
    <Autocomplete
      options={options}
      value={colorStandard}
      size="small"
      onChange={handleChange}
      renderInput={(params) => (
        <TextField
          {...params}
          sx={{
            width: 250,
            "& .MuiOutlinedInput-root": {
              height:customStyling?customStyling:32, // Adjust height
              borderRadius: 50, // Rounded corners
              "& fieldset": {
                borderRadius: 50, // Ensure border radius for outline
              },
            },
            "& .MuiInputBase-input::placeholder": {
              fontSize: "0.4rem", // Adjust placeholder font size
            },
            "& .MuiInputBase-input": {
              fontSize: "0.8rem", // Adjust input and placeholder font size
            },
            "& .MuiFormLabel-root": {
              fontSize: "14px",
              marginBottom: 4,
            },
            "& input::placeholder": {
              fontSize: "10px",
            },
          }}
          label="Choose a color standard"
          variant="outlined"
        />
      )}
      sx={[customStyling, { width: 250 }]} // Style for width
    />
  );
};

export default AutoCompleteDropdown;
