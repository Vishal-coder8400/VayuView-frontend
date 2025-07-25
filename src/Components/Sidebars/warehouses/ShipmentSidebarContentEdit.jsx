import React, { useState } from "react";
import CustomInput from "../../../common/core/CustomInput";
import { callApi } from "../../../utils/api";
import Error from "../../../utils/Error";
import ToggleDays from "../../Dashboard/Warehouses/ToggleWeek";
import { store } from "../../../store";
import ToggleButton from "./toggle";
import { getBaseURL } from "../../../common/constant/urls";
import { Autocomplete, TextField } from "@mui/material";
import DateTimePicker from "react-datetime-picker";
import "react-datetime-picker/dist/DateTimePicker.css";
import "react-calendar/dist/Calendar.css";
import "react-clock/dist/Clock.css";
import TimeRange from "react-time-range";
import moment from "moment";
import { round } from "lodash";


const BoxTable = (props) => {
  const [boxes, setBoxes] = useState([
    {
      boxName: "",
      boxType: "",
      boxWeight: "",
      numOfBoxes: "",
      length: "",
      breadth: "",
      volumetric_weight: "",
      height: "",
    },
  ]);
  React.useEffect(()=>{
    setBoxes(props.value)
  }, [])
  const handleAddRow = () => {
    setBoxes([
      ...boxes,
      {
        boxName: "",
        boxType: "",
        boxWeight: "",
        numOfBoxes: "",
        length: "",
        breadth: "",
        volumetric_weight: "",
        height: "",
      },
    ]);
  };

  const handleDeleteRow = (index) => {
    const updatedBoxes = [...boxes];
    updatedBoxes.splice(index, 1);
    setBoxes(updatedBoxes);
  };

  const handleChange = (e, index, key) => {
    if(!e.target){
    let updatedBoxes = [...boxes];
    updatedBoxes[index][key] = e;
    setBoxes(updatedBoxes);
    props.setBoxValues(updatedBoxes);
    }else{
      let updatedBoxes = [...boxes];
      updatedBoxes[index][key] = e.target.value;
      setBoxes(updatedBoxes);
      props.setBoxValues(updatedBoxes);
    }
  };

  return (
    <div className="box-table-container">
      <table className="box-table">
        <thead>
          <tr>
            <th>No. of Boxes</th>
            <th>Length {props?.dimension}</th>
            <th>Breadth {props?.dimension}</th>
            <th>Height {props?.dimension}</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {boxes.map((box, index) => (
            <tr key={index}>
              <td>
                <input
                  type="text"
                  value={box.numOfBoxes}
                  onChange={(e) => {
                    const updatedBoxes = [...boxes];
                    let currBox = updatedBoxes[index];
                    if (
                      parseInt(e.target.value) &&
                      parseInt(currBox["breadth"]) &&
                      parseInt(currBox["height"]) && 
                      parseInt(currBox["length"])
                    ) {
                      handleChange(
                        round((parseInt(e.target.value) *
                          parseInt(currBox["breadth"]) *
                          parseInt(currBox["height"]) *
                          parseInt(currBox["length"])*7)/(props.dimensionType === "CENTIMETER"?27000:5000)),
                        index,
                        "volumetric_weight"
                      );
                    }else{
                      handleChange(
                        '',
                        index,
                        "volumetric_weight"
                      );
                    }
                    
                    handleChange(e, index, "numOfBoxes")
                
                }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={box.length}
                  onChange={(e) => {
                    const updatedBoxes = [...boxes];
                    let currBox = updatedBoxes[index];
                    if (
                      parseInt(e.target.value) &&
                      parseInt(currBox["breadth"]) &&
                      parseInt(currBox["height"]) && 
                      parseInt(currBox["numOfBoxes"])
                    ) {
                      handleChange(
                        round((parseInt(e.target.value) *
                          parseInt(currBox["breadth"]) *
                          parseInt(currBox["height"]) *
                          parseInt(currBox["numOfBoxes"])*7)/(props.dimensionType === "CENTIMETER"?27000:5000)),
                        index,
                        "volumetric_weight"
                      );
                    }else{
                      handleChange(
                        '',
                        index,
                        "volumetric_weight"
                      );
                    }
                    handleChange(e, index, "length");
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={box.breadth}
                  onChange={(e) => {
                    const updatedBoxes = [...boxes];
                    let currBox = updatedBoxes[index];
                    if (
                      parseInt(currBox["length"]) &&
                      parseInt(e.target.value) &&
                      parseInt(currBox["height"]) &&
                      parseInt(currBox["numOfBoxes"])
                    ) {
                      handleChange(
                        round((parseInt(currBox["length"]) *
                          parseInt(e.target.value) *
                          parseInt(currBox["height"])*
                          parseInt(currBox["numOfBoxes"])*7)/(props.dimensionType === "CENTIMETER"?27000:5000)),
                        index,
                        "volumetric_weight"
                      );
                    }else{
                      handleChange(
                        '',
                        index,
                        "volumetric_weight"
                      );
                    }
                    handleChange(e, index, "breadth");
                  }}
                />
              </td>
              <td>
                <input
                  type="text"
                  value={box.height}
                  onChange={(e) => {
                    const updatedBoxes = [...boxes];
                    let currBox = updatedBoxes[index];
                    console.log(
                      parseInt(currBox["length"]) &&
                      parseInt(currBox["breadth"]) &&
                      parseInt(currBox["height"]) && 
                      parseInt(currBox["numOfBoxes"]),
                      parseInt(currBox["length"]) ,
                      parseInt(currBox["width"]) ,
                      parseInt(currBox["height"]), 
                      parseInt(currBox["numOfBoxes"])
                    )
                    if (
                      parseInt(currBox["length"]) &&
                      parseInt(currBox["breadth"]) &&
                      parseInt(e.target.value) && 
                      parseInt(currBox["numOfBoxes"])
                    ) {
                      handleChange(
                       round((parseInt(currBox["length"]) *
                          parseInt(currBox["breadth"]) *
                          parseInt(e.target.value) *
                          parseInt(currBox["numOfBoxes"])*7)/(props.dimensionType === "CENTIMETER"?27000:5000)),
                        index,
                        "volumetric_weight"
                      );
                    }else{
                      handleChange(
                        '',
                        index,
                        "volumetric_weight"
                      );
                    }
                    handleChange(e, index, "height");
                  }}
                />
              </td>
              <td>
                <button onClick={() => handleDeleteRow(index)} style={{color: 'red'}}>x</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="add-row-button" onClick={handleAddRow}>
        Add More
      </button>
    </div>
  );
};

function TimePickerValue(props) {
  // const [value, onChange] = useState('10:00');
  return (
    <DateTimePicker
      onChange={(v) => {
        props.setValue(v);
      }}
      value={props.value}
    />
  );
}

const ShipmentSidebarContentEdit = (props) => {
  const { toggleSidebar, addRowData } = props;
  const [formData, setFormData] = useState({
    orderType: {
      title: "Order Type",
      value: "single_order",
      placeholder: "Select order type",
      type: "toggle",
    },
    // warehouse_id: {
    //   title: "Warehouse ID",
    //   value: "",
    //   placeholder: "e.g., warehouseA",
    //   type: "input",
    // },
    consigneeName: {
      title: "Consignee Name",
      value: "",
      placeholder: "e.g., John Doe",
      type: "input",
      required: true,
    },
    consigneeAddress: {
      title: "Consignee Address",
      value: "",
      placeholder: "e.g., 123 Main Street",
      type: "input",
      required: true,
    },
    pincode: {
      title: "Postal Code",
      value: "",
      placeholder: "e.g., 123456",
      type: "number",
      required: true,
    },
    city: {
      title: "City",
      value: "",
      placeholder: "e.g., Cityville",
      type: "input",
      required: true,
    },
    state: {
      title: "State",
      value: "",
      placeholder: "e.g., Stateville",
      type: "input",
      required: true,
    },
    contactNo: {
      title: "Contact Number",
      value: "",
      placeholder: "e.g., 123-456-7890",
      countryCodeReq: true,
      type: "number",
      required: true,
    },
    consigneeGet: {
      title: "Consignee Gst",
      value: "",
      placeholder: "e.g., Get Info",
      type: "input",
    },
    noOfBoxes: {
      title: "Number of Boxes",
      value: "",
      placeholder: "Enter the number of boxes",
      type: "number",
      required: true,
    },
    // dimensions: {
    //   title: "Dimensions",
    //   value: {
    //     length: 0,
    //     width: 0,
    //     height: 0,
    //   },
    //   placeholder: "Enter dimensions (L x W x H)",
    //   type: "dimensions",
    // },
    actualWeight: {
      title: "Actual Weight",
      value: 0,
      placeholder: "Enter actual weight",
      type: "number",
      required: true,
    },
    description: {
      title: "Description",
      value: "",
      placeholder: "Enter a description",
      type: "input",
      required: true,
    },
    paymentMode: {
      title: "Payment Mode",
      value: store.getState().userData.user?.company_id?.payment_mode,
      placeholder: "Select payment mode",
      type: "input",
      required: true,
      disabled: true,
    },
    orderNo: {
      title: "Order Number",
      value: "",
      placeholder: "e.g., ABC123",
      type: "input",
      required: true,
    },
    invoiceValue: {
      title: "Invoice Value",
      value: "",
      placeholder: "e.g., 100",
      type: "input",
      required: true,
    },
    invoiceNo: {
      title: "Invoice Number",
      value: "",
      placeholder: "e.g., INV456",
      type: "input",
      required: true,
    },

    dimensions: {
      title: "Dimensions",
      value: [],
      type: "dimensions",
      required: true
    },
    eWayBill: {
      title: "E-Way Bill",
      value: "",
      placeholder: "Enter E-Way Bill",
      type: "input",
    },
    transporter_id: {
      title: "Transporter ID",
      value: store.getState().userData.user?.company_id?.transporter_id,
      placeholder: "Transporter ID",
      type: "hidden",
      disabled: true,
      required: true,
    },
    rovFovType: {
      title: "FOV Type",
      value: "Owner Risk",
      placeholder: "FOV Type",
      type: "select",
      options: ["Carrier Risk", "Owner Risk"],
      required: true
    },
    appointmentDateTime: {
      title: "Appointment Date & Time",
      value: new Date(),
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    appointmentTimeRange: {
      title: "Appointment Time Range",
      value: [new Date(), new Date()],
      placeholder: "",
      type: "time-range",
      required: true,
    },
  });

  const [warehouseOptionsId, setWarehouseOptionsId] = useState([]);
  const [warehouseOptions, setWarehouseOptions] = useState([]);
  const [warehouseSelected, setWarehouseSelected] =
    useState("Select Warehouse");

  const getWarehouses = async () => {
    await callApi({
      method: "GET",
      endpoint: "api/pickups",
    })
      .then((res) => {
        console.log(res, "org");
        let wList = res.data.map((org) => {
          return org._id;
        });

        let wListId = res.data.map((org) => {
          return org._id;
        });
        console.log(wList, "WAREHOUSE LIST");
        setWarehouseOptions(wList);
        setWarehouseSelected(wListId[0]);
        setWarehouseOptionsId(wListId);
      })
      .catch(() => {});
  };

  React.useEffect(() => {
    getWarehouses();
  }, []);
  React.useEffect(() => {
    console.log(props.dataGiven, "DATA GIVEN");
    setFormData(props.dataGiven);
  }, [props.dataGiven]);

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
    let keys = Object.keys(formData);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "consigneeGet" || keys[i] === "eWayBill") {
        continue;
      }
      console.log(formData[keys[i]], 'FORMDATA-KEYS')
      if (formData[keys[i]].value === "") {
        Error(`${formData[keys[i]].title} Cannot be empty `);
        return;
      }
    }
    let dataObject = {};
    keys.forEach((key) => {
      dataObject = { [key]: formData[key]?.value, ...dataObject };
    });

    dataObject = {
      ...dataObject,
      user_id: store.getState().userData?.user?.oid,
      warehouse_id: warehouseSelected,
    };
    console.log(dataObject);
    if(dataObject.contactNo.length!==10){
      Error("Phone number must be of 10 digits");
      return;
    }
    await callApi({
      method: "PATCH", // props.dataGiven ? "PATCH" :
      endpoint: "api/shippings/" + props.selectedWarehouse, //+ (props.dataGiven ? dataObject['id'] : ""),
      data: dataObject,
      alert: true,
    })
      .then(async (res) => {
        toggleSidebar();
        props.getData();
      })
      .catch((err) => {});
  };

  return (
    <div className="flex flex-col w-[100%] h-[90%] gap-4 p-4">
      <h4 style={{ fontWeight: "600" }}>Update Shipment</h4>
      <>
        <div className="flex flex-col gap-2">
          <label>Select Pickup</label>
          {/* {JSON.stringify(warehouseOptions)}
          {JSON.stringify(warehouseOptionsId)}
          {props.toggleId["_id"]} */}
          <Autocomplete
            options={warehouseOptions.map((option, index) => ({
              id: option,
              name: option,
            }))}
            getOptionLabel={(option) => option}
            value={
              warehouseOptions.find(
                (option) => option === props?.toggleId?.["_id"]
              ) || ""
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant="outlined"
                placeholder="Select Pickup"
                fullWidth
                // className="transition block w-full pl-4 h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            )}
            onChange={(event, newValue) => {
              setWarehouseSelected(newValue || "");
            }}
            noOptionsText="No option"
          />
        </div>
        {Object.keys(formData)?.map((element) => {
          return formData[element].type === "input" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formData[element]?.title}
                {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              <CustomInput
                placeholder={formData[element]?.placeholder}
                value={formData[element]?.value}
                onChange={(e) => handleChange(element, e.target.value)}
              />
            </div>
          ) : formData[element].type === "number" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formData[element]?.title}
                {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              <CustomInput
              number
              countryCodeReq={formData[element]?.countryCodeReq}
                placeholder={formData[element]?.placeholder}
                value={formData[element]?.value}
                onChange={(e) => handleChange(element, e.target.value)}
              />
            </div>
          ) : formData[element].type === "toggle" ? (
            <></>
          ) : formData[element].type === "select" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formData[element]?.title}
                {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              {formData[element]?.options ? (
                <select
                  className="transition block w-full pl-4 h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={formData[element]?.value}
                  onChange={(e) => {
                    handleChange(element, e.target.value);
                    console.log(e, "e");
                  }}
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
                  Pass the key name options which is array of string in the
                  object which mention types as select
                </>
              )}
            </div>
          ) : formData[element].type === "days" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formData[element]?.title}
                {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
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
                {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
            </div>
          ) : formData[element].type === "time-picker" ? (
            <>
              <label>
                {formData[element]?.title}
                {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              <TimePickerValue
                value={formData[element]?.value}
                setValue={(v) => {
                  handleChange(element, v);
                }}
                minDate={new Date()}
              />
            </>
          ): formData[element].type === "dimensions" ? (
            <>
            <label>
            {formData[element]?.title}
            {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
            </label>
            <BoxTable  
              value={formData[element].value}
              setBoxValues={(v)=>{
                handleChange(element, v)
              }}
          /></>) : formData[element].type === "time-range" ? (
            <>
              <label>
                {formData[element]?.title}
                {formData[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              <TimeRange
                startMoment={formData[element]?.value[0]}
                endMoment={formData[element]?.value[1]}
                onChange={(data) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    [element]: { ...prevFormData[element], value: [data.startTime, data.endTime] },
                  }));
                  console.log(data, "DATARANGE");
                }}
              />
             

            </>
          ) :  (
            <></>
          );
        })}
      </>

      <button
        type="submit"
        onClick={handleSubmit}
        className="transition mt-10 mb-2 block w-full pl-4 h-[54px] rounded-[4px] font-semibold leading-6 text-white bg-indigo-500 border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus: hover:bg-indigo-600  "
      >
        Update
        {/* {props.dataGiven?"Update":"Create"} */}
      </button>
      <br />
    </div>
  );
};

export default ShipmentSidebarContentEdit;
