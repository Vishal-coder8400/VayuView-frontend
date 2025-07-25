import React, { useEffect, useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import CustomInput from "../../../common/core/CustomInput";
import { callApi } from "../../../utils/api";
import { store } from "../../../store";
import { Autocomplete, TextField } from "@mui/material";
import ToggleDays from "../../Dashboard/Warehouses/ToggleWeek";

const SidebarContent = ({
  toggleSidebar,
  getData,
  addRowData = null,
  formFields = [], // Default to an empty array
  apiEndpoint,
  apiMethod = "POST",
  title = "Create New Item",
}) => {
  const isEditMode = !!addRowData;

  // Function to get the current date
  function getCurrentDate() {
    const date = dateAfter1Year();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  // Set initial form data based on props or default values
  const [formData, setFormData] = useState(
    isEditMode
      ? Object.keys(formFields).map((field) => {
          let v = {};
          v[field] = formFields[field];
          v[field]["value"] = addRowData[field];
          return v;
        }, {})
      : formFields // Fallback to an empty object if formFields isn't an array
  );

  React.useEffect(() => {
    setFormData(formFields);
    if (isEditMode) {
      setFormData(
        Object.keys(formFields).map((field) => {
          let v = {};
          v[field] = formFields[field];
          v[field]["value"] = addRowData[field];
          return v;
        }, {})
      );
    } else {
      setFormData(formFields);
    }
  }, [formFields]);

  // Handle form input changes
  const handleChange = (fieldName, value) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: { ...prevFormData[fieldName], value },
    }));
  };

  // Handle checkbox state
  const [isChecked, setIsChecked] = useState(true);
  const handleCheckboxChange = (key) => {
    setIsChecked(!isChecked);
    handleChange(key, !isChecked);
  };

  // Submit form data
  const handleSubmit = async () => {
    const dataObject = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key].value;
      return acc;
    }, {});

    dataObject.user_id = store.getState().userData?.user?._id;
    dataObject.createdBy = store.getState().userData?.user?._id;

    await callApi({
      method: apiMethod,
      endpoint: apiEndpoint,
      data: dataObject,
      alert: true,
    })
      .then(() => {
        toggleSidebar();
        getData();
      })
      .catch((err) => console.error("Form submission error:", err));
  };

  // Fetch warehouses or any dynamic options if needed
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [warehouseSelected, setWarehouseSelected] = useState("");
  const dateAfter1Year = () => {
    let date = new Date();
    date.setFullYear(date.getFullYear() + 1); // Add 12 months to the current date
    return date;
  };
  return (
    <div className="flex flex-col w-[100%] h-[90%] gap-4 p-4">
      <h4 style={{ fontWeight: "600" }}>{isEditMode ? "Edit Item" : title}</h4>
      {formData &&
        Object.keys(formData).map((fieldKey) => {
          const field = formData[fieldKey];

          return (
            <div key={fieldKey} className="flex flex-col gap-2">
              {/* {JSON.stringify(field)} */}
              {field.type !== "hidden" && <label>{field.title}</label>}
              {field.type === "text" && (
                <CustomInput
                  placeholder={field.placeholder}
                  value={field.value}
                  disabled={field.disabled}
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                />
              )}
              {field.type === "phone" && (
                <CustomInput
                  countryCodeReq={true}
                  placeholder={field.placeholder}
                  value={field.value}
                  disabled={field.disabled}
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                />
              )}
              {field.type === "number" && (
                <CustomInput
                  number
                  placeholder={field.placeholder}
                  value={field.value}
                  disabled={field.disabled}
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                />
              )}
              {field.type === "input-date" && (
                <input
                  style={{ borderRadius: 100 }}
                  type="date"
                  disabled={field.disabled}
                  value={field.value || getCurrentDate()}
                  className="transition block w-full pl-4 h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300"
                  onChange={(e) => handleChange(fieldKey, e.target.value)}
                />
              )}
              {field.type === "select" && (
                <>
                  <Autocomplete
                    options={field.options.map((item) => ({
                      key: item.value,
                      name: item.label,
                    }))}
                    disabled={field.disabled}
                    value={field.value && {
                      key:
                        typeof field.value === 'object'
                          ? field?.options.find(
                              (fo) => fo.value == field.value?._id
                            )?.value
                          : field?.options.find((fo) => fo.value == field.value)
                              ?.value,
                      name: typeof field.value === 'object'
                      ? field?.options.find(
                          (fo) => fo.value == field.value?._id
                        )?.label
                      :field?.options.find((fo) => fo.value == field.value)
                        ?.label,
                    }}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        value={field.value}
                        placeholder={field.placeholder}
                        fullWidth
                        sx={{
                          "& .MuiOutlinedInput-root": {
                            borderRadius: "100px", // Adjust the border-radius here
                            height: "45px", // Adjust the height here
                          },
                        }}
                      />
                    )}
                    onChange={(event, newValue) => {
                      setWarehouseSelected(newValue ? newValue.key : "");
                      handleChange(fieldKey, newValue ? newValue.key : "");
                    }}
                  />
                </>
              )}
              
              {field.type === "boolean" && (
                <label>
                  <input
                    type="checkbox"
                    checked={fieldKey.value}
                    onChange={()=>{handleCheckboxChange(fieldKey)}}
                  />
                  &nbsp;&nbsp;{field.title}
                </label>
              )}
              {field.type === "days" && (
                <ToggleDays
                  setData={(days) => {
                    handleChange("working_days", Array.from(days));
                  }}
                />
              )}
            </div>
          );
        })}
      <button
        type="submit"
        onClick={handleSubmit}
        className="transition mt-10 mb-2 block w-full pl-4 h-[54px] rounded-[100px] font-semibold leading-6 text-white bg-indigo-500 border-0 py-1.5 text-gray-900 hover:bg-indigo-600"
      >
        {isEditMode ? "Update" : "Create"}
      </button>
    </div>
  );
};

// Add prop types validation
SidebarContent.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  addRowData: PropTypes.object,
  formFields: PropTypes.array,
  apiEndpoint: PropTypes.string.isRequired,
  apiMethod: PropTypes.string,
  title: PropTypes.string,
};

export default SidebarContent;
