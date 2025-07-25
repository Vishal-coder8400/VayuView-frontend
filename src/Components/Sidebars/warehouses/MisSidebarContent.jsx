import React, { useEffect, useState } from "react";
import CustomInput from "../../../common/core/CustomInput";
import { callApi } from "../../../utils/api";
import Error from "../../../utils/Error";
import ToggleDays from "../../Dashboard/Warehouses/ToggleWeek";
import { store } from "../../../store";
import { Autocomplete, TextField } from "@mui/material";

const MisSidebarContent = (props) => {
  const { toggleSidebar, addRowData } = props;
  function getCurrentDate() {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    
    return `${year}-${month}-${day}`;
  }
  const [formData, setFormData] = useState({
    pickup_date: {
      title: "Pickup Date",
      value: getCurrentDate(),
      placeholder: "",
      type: "input-date",
    },
    no_of_boxes: {
      title: "No of boxes",
      value: "",
      placeholder: "10",
      type: "number",
    },
  });
  useEffect(() => {
    handleChange("warehouse_id", props?.selectedWarehouse?.split("_-:_;")[1]);
  }, [props.selectedWarehouse]);

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    handleChange("rto", !isChecked);
  };

  const handleChange = (fieldName, value) => {
    console.log(fieldName, value, "THIS IS VALUE");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [fieldName]: { ...prevFormData[fieldName], value },
    }));
  };

  const handleSubmit = async (e) => {
    console.log(props, props?.selectedWarehouse);
    const dataObject = {
      user_id: store.getState().userData?.user?.oid,
      warehouse_id: warehouseSelected,
      pickup_date: formData.pickup_date.value,
      noOfBoxes: formData.no_of_boxes.value,
    };
    console.log(dataObject, "DATA_OBJ");
    await callApi({
      method: "POST",
      endpoint: "api/pickups",
      data: dataObject,
      alert: true,
    })
      .then((res) => {
        toggleSidebar();
        props.getData();
      })
      .catch((err) => {});
  };
  const [warehouseOptionsId, setWarehouseOptionsId] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [warehouseSelected, setWarehouseSelected] =
    useState("Select Warehouse");

  const getWarehouses = async () => {
    await callApi({
      method: "GET",
      endpoint: "api/warehouses",
    })
      .then((res) => {
        console.log(res, "org");
        let wList = res.data.map((org) => {
          return org.warehouse_name;
        });

        let wListId = res.data.map((org) => {
          return org._id;
        });

        let wListOptions = res.data.map((org) => {
          return { [org._id]: org.warehouse_name };
        });

        console.log(wList, "WAREHOUSE LIST");
        setWarehouseOptions(wListOptions);
        setWarehouseSelected(wListId[0]);
        setWarehouseOptionsId(wListId);
      })
      .catch(() => {});
  };
  React.useEffect(() => {
    getWarehouses();
  }, []);
  return (
    <div className="flex flex-col w-[100%] h-[90%] gap-4 p-4">
      <h4 style={{ fontWeight: "600" }}>Create New Pickup</h4>
      <div className="flex flex-col gap-2">
        <label>Select Warehouse</label>
        {/* {JSON.stringify(warehouseOptions)} */}
        {/* {warehouseSelected} */}
        <Autocomplete
          options={warehouseOptions.map((item) => {
            const key = Object.keys(item)[0];
            const name = item[key];
            return { key, name };
          })}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="Select a warehouse"
              fullWidth
            />
          )}
          onChange={(event, newValue) => {
            setWarehouseSelected(newValue ? newValue.key : "");
          }}
        />
        {/* <select
              className="transition block w-full pl-4 h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => {
                setWarehouseSelected(e.target.value);
              }}
            >
              {warehouseOptions?.length !== 0 ? (
                warehouseOptions?.map((option) => {
                  return <option value={option}>{option}</option>;
                })
              ) : (
                <option value={"Select Warehouse"}>no option</option>
              )}
            </select> */}
      </div>
      {Object.keys(formData)?.map((element) => {
        return formData[element].type === "input" ? (
          <div className="flex flex-col gap-2">
            <label>{formData[element]?.title}</label>
            <CustomInput
              placeholder={formData[element]?.placeholder}
              value={formData[element]?.value}
              onChange={(e) => handleChange(element, e.target.value)}
            />
          </div>
        ) : formData[element].type === "disabled" ? (
          <div className="flex flex-col gap-2">
            <label>{formData[element]?.title}</label>
            <label className="w-full h-[40px] font-black ">
              {formData[element]?.value}
            </label>
          </div>
        ) : formData[element].type === "number" ? (
          <div className="flex flex-col gap-2">
            <label>{formData[element]?.title}</label>
            <CustomInput
              number
              placeholder={formData[element]?.placeholder}
              value={formData[element]?.value}
              onChange={(e) => handleChange(element, e.target.value)}
            />
          </div>
        ) : formData[element].type === "select" ? (
          <div className="flex flex-col gap-2">
            <label>{formData[element]?.title}</label>
            {formData[element]?.options ? (
              <select
                className="transition block w-full pl-4 h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                onChange={(e) => handleChange(element, e.target.value)}
              >
                {formData[element]?.options.length !== 0 ? (
                  formData[element]?.options?.map((option) => {
                    return <option value={option}>{option}</option>;
                  })
                ) : (
                  <option value={""}>no option</option>
                )}
              </select>
            ) : (
              <>
                Pass the key name options which is array of string in the object
                which mention types as select
              </>
            )}
          </div>
        ) : formData[element].type === "input-date" ? (
          <div className="flex flex-col gap-2">
            <label>{formData[element]?.title}</label>
            <input
            value={formData[element]?.value}
              type="date"
              className="transition block w-full pl-4 h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              onChange={(e) => handleChange(element, e.target.value)}
            />
          </div>
        ) : formData[element].type === "days" ? (
          <div className="flex flex-col gap-2">
            <label>{formData[element]?.title}</label>
            <ToggleDays
              setData={(days) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  working_days: {
                    ...prevFormData["working_days"],
                    value: Array.from(days),
                  },
                }));
              }}
            />
          </div>
        ) : formData[element].type === "boolean" ? (
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
              />
              &nbsp;&nbsp;
              {formData[element]?.title}
            </label>
          </div>
        ) : (
          <></>
        );
      })}
      <button
        type="submit"
        onClick={handleSubmit}
        className="transition mt-10 mb-2 block w-full pl-4 h-[54px] rounded-[4px] font-semibold leading-6 text-white bg-indigo-500 border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus: hover:bg-indigo-600  "
      >
        Create
        {/* {props.dataGiven?"Update":"Create"} */}
      </button>
      <br />
    </div>
  );
};

export default MisSidebarContent;
