import React, { useState } from "react";
import CustomInput from "../../../common/core/CustomInput";
import { callApi } from "../../../utils/api";
import Error from "../../../utils/Error";
import ToggleDays from "../../Dashboard/Warehouses/ToggleWeek";
import { store } from "../../../store";
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker } from 'react-time-picker';
import { isEmpty, times } from "lodash";


function TimePickerValue(props) {
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  function convertToISOWithGivenTime(timeString) {
    //alert('working here', timeString)
    // Split the timeString into hours and minutes

    let [hours, minutes] = timeString.split(':').map(Number);

    // Create a new Date object with today's date
    let date = new Date();

    // Set the provided hours and minutes
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    console.log(timeString, hours, minutes, date, 'DATEEEE')

    let isoDateString = date.toISOString();

    return isoDateString;
}

// const [value, onChange] = useState('10:00');
  return (
    <TimePicker onChange={(v)=>{
      props.setValue(v)}} value={props.value} />
  );
}

const WarehousesSidebarContent = (props) => {
  const { toggleSidebar, addRowData } = props;
  const [formData, setFormData] = useState({
    warehouse_name: {
      title: "Warehouse Name",
      value: "",
      placeholder: "Warehouse A",
      type: "input",
      required: true,
    },
    warehouse_address: {
      title: "Address",
      value: "",
      placeholder: "address",
      type: "input",
      required: true,
    },
    warehouse_city: {
      title: "City",
      value: "",
      placeholder: "bhopal",
      type: "input",
      required: true,
    },
    warehouse_state: {
      title: "State",
      value: "",
      placeholder: "Madhya pradesh",
      type: "input",
      required: true,
    },
    warehouse_country: {
      title: "Country",
      value: "",
      placeholder: "India",
      type: "input",
      required: true,
    },
    postal_code: {
      title: "Postal Code",
      value: "",
      placeholder: "462001",
      type: "number",
      required: true,
    },
    contact_person: {
      title: "Contact Person Name",
      value: "",
      placeholder: "john williams",
      type: "input",
      required: true,
    },
    contact_person_mail: {
      title: "Contact Person Mail",
      value: "",
      placeholder: "john.williams@company.com",
      type: "input",
    },
    contact_person_number: {
      title: "Contact Person Phone",
      value: "",
      placeholder: "XXXXX - XXXXX",
      countryCodeReq: true,
      type: "number",
      required: true,
    },
    scheduled_start_time: {
      title: "Scheduled Start Time",
      value: "10:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    scheduled_end_time: {
      title: "Scheduled End Time",
      value: "17:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    working_days: {
      title: "Working Days",
      value: [],
      placeholder: "",
      type: "days",
      required: true,
    },
    rto: {
      title: "RTO",
      value: false,
      placeholder: "",
      type: "boolean",
      required: true,
    },
  });
  const [formDataRTO, setFormDataRTO] = useState({
    warehouse_name: {
      title: "Warehouse Name",
      value: "",
      placeholder: "Warehouse A",
      type: "input",
      required: true,
    },
    warehouse_address: {
      title: "Address",
      value: "",
      placeholder: "address",
      type: "input",
      required: true,
    },
    warehouse_city: {
      title: "City",
      value: "",
      placeholder: "bhopal",
      type: "input",
      required: true,
    },
    warehouse_state: {
      title: "State",
      value: "",
      placeholder: "Madhya pradesh",
      type: "input",
      required: true,
    },
    warehouse_country: {
      title: "Country",
      value: "",
      placeholder: "India",
      type: "input",
      required: true,
    },
    postal_code: {
      title: "Postal Code",
      value: "",
      placeholder: "462001",
      type: "number",
      required: true,
    },
    contact_person: {
      title: "Contact Person Name",
      value: "",
      placeholder: "john williams",
      type: "input",
      required: true,
    },
    contact_person_mail: {
      title: "Contact Person Mail",
      value: "",
      placeholder: "john.williams@company.com",
      type: "input",
    },
    contact_person_number: {
      title: "Contact Person Phone",
      value: "",
      placeholder: "XXXXX - XXXXX",
      countryCodeReq: true,
      type: "number",
      required: true,
    },
    scheduled_start_time: {
      title: "Scheduled Start Time",
      value: "10:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    scheduled_end_time: {
      title: "Scheduled End Time",
      value: "17:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    working_days: {
      title: "Working Days",
      value: [],
      placeholder: "",
      type: "days",
      required: true,
    },
  });

  const [rtoSame, setRtoSame] = useState(true);

  React.useEffect(() => {
    console.log(props.dataGiven, "RTO data given")
    if(!isEmpty(props.dataGiven)){
      setFormData(props.dataGiven);
    }
  }, [props.dataGiven]);

React.useEffect(()=>{
  setFormData({
    warehouse_name: {
      title: "Warehouse Name",
      value: "",
      placeholder: "Warehouse A",
      type: "input",
      required: true,
    },
    warehouse_address: {
      title: "Address",
      value: "",
      placeholder: "address",
      type: "input",
      required: true,
    },
    warehouse_city: {
      title: "City",
      value: "",
      placeholder: "bhopal",
      type: "input",
      required: true,
    },
    warehouse_state: {
      title: "State",
      value: "",
      placeholder: "Madhya pradesh",
      type: "input",
      required: true,
    },
    warehouse_country: {
      title: "Country",
      value: "",
      placeholder: "India",
      type: "input",
      required: true,
    },
    postal_code: {
      title: "Postal Code",
      value: "",
      placeholder: "462001",
      type: "number",
      required: true,
    },
    contact_person: {
      title: "Contact Person Name",
      value: "",
      placeholder: "john williams",
      type: "input",
      required: true,
    },
    contact_person_mail: {
      title: "Contact Person Mail",
      value: "",
      placeholder: "john.williams@company.com",
      type: "input",
    },
    contact_person_number: {
      title: "Contact Person Phone",
      value: "",
      placeholder: "XXXXX - XXXXX",
      countryCodeReq: true,
      type: "number",
      required: true,
    },
    scheduled_start_time: {
      title: "Scheduled Start Time",
      value: "10:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    scheduled_end_time: {
      title: "Scheduled End Time",
      value: "17:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    working_days: {
      title: "Working Days",
      value: [],
      placeholder: "",
      type: "days",
      required: true,
    },
    rto: {
      title: "RTO",
      value: false,
      placeholder: "",
      type: "boolean",
      required: true,
    },
  })
  setFormDataRTO({
    warehouse_name: {
      title: "Warehouse Name",
      value: "",
      placeholder: "Warehouse A",
      type: "input",
      required: true,
    },
    warehouse_address: {
      title: "Address",
      value: "",
      placeholder: "address",
      type: "input",
      required: true,
    },
    warehouse_city: {
      title: "City",
      value: "",
      placeholder: "bhopal",
      type: "input",
      required: true,
    },
    warehouse_state: {
      title: "State",
      value: "",
      placeholder: "Madhya pradesh",
      type: "input",
      required: true,
    },
    warehouse_country: {
      title: "Country",
      value: "",
      placeholder: "India",
      type: "input",
      required: true,
    },
    postal_code: {
      title: "Postal Code",
      value: "",
      placeholder: "462001",
      type: "number",
      required: true,
    },
    contact_person: {
      title: "Contact Person Name",
      value: "",
      placeholder: "john williams",
      type: "input",
      required: true,
    },
    contact_person_mail: {
      title: "Contact Person Mail",
      value: "",
      placeholder: "john.williams@company.com",
      type: "input",
    },
    contact_person_number: {
      title: "Contact Person Phone",
      value: "",
      placeholder: "XXXXX - XXXXX",
      countryCodeReq: true,
      type: "number",
      required: true,
    },
    scheduled_start_time: {
      title: "Scheduled Start Time",
      value: "10:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    scheduled_end_time: {
      title: "Scheduled End Time",
      value: "17:00",
      placeholder: "",
      type: "time-picker",
      required: true,
    },
    working_days: {
      title: "Working Days",
      value: [],
      placeholder: "",
      type: "days",
      required: true,
    },
  })
  setIsChecked(false)
}, [props.sidebarOpen])
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

  const handleChangeRTO = (fieldName, value) => {
    console.log(fieldName, value, "THIS IS VALUE");
    setFormDataRTO((prevFormData) => ({
      ...prevFormData,
      [fieldName]: { ...prevFormData[fieldName], value },
    }));
  };

  const handleSubmit = async (e) => {
    let keys = Object.keys(formData);
    for (let i = 0; i < keys.length; i++) {
      if(keys[i] === "contact_person_mail"){
        continue;
      }
      if (formData[keys[i]].value === "") {
        Error(`${formData[keys[i]].title} is empty or incorrect `);
        return;
      }
    }
    let dataObject = {};
    keys.forEach((key) => {
      dataObject = { [key]: formData[key]?.value, ...dataObject };
    });

    let RTOkeys = Object.keys(formDataRTO);
    let RTOdataObject = {};
    RTOkeys.forEach((keyRTO) => {
      RTOdataObject = { [keyRTO]: formDataRTO[keyRTO]?.value, ...RTOdataObject };
    });
    dataObject = {
      ...dataObject,
      user_id: store.getState().userData?.user?.oid,
      rto_address: formData['rto'].value?rtoSame?{}:RTOdataObject:{}
    };
    console.log(dataObject);
    if(dataObject.contact_person_number.length!==10){
      Error("Phone number must be of 10 digits");
      return;
    }
    await callApi({
      method: props.dataGiven?"PATCH":"POST", //props.dataGiven ? "PATCH" :
      endpoint: props.dataGiven?"api/warehouses/"+props.selectedWarehouse:"api/warehouses", //+ (props.dataGiven ? dataObject['id'] : ""),
      data: dataObject,
      alert: true,
    })
      .then((res) => {
        setFormData((prevFormData) => {
          const updatedFormData = {};
          Object.keys(prevFormData).forEach((key) => {
            updatedFormData[key] = {
              ...prevFormData[key],
              value: "",
            };
          });
          return updatedFormData;
        });
        if (props.dataGiven) {
          setFormData({
            warehouse_name: {
              title: "Warehouse Name",
              value: "",
              placeholder: "Warehouse A",
              type: "input",
            },
            warehouse_address: {
              title: "Address",
              value: "",
              placeholder: "address",
              type: "input",
            },
            warehouse_city: {
              title: "City",
              value: "",
              placeholder: "bhopal",
              type: "input",
            },
            warehouse_state: {
              title: "State",
              value: "",
              placeholder: "Madhya pradesh",
              type: "input",
            },
            warehouse_country: {
              title: "Country",
              value: "",
              placeholder: "India",
              type: "input",
            },
            postal_code: {
              title: "Postal Code",
              value: "",
              placeholder: "462001",
              type: "number",
            },
            contact_person: {
              title: "Contact Person Name",
              value: "",
              placeholder: "john williams",
              type: "input",
            },
            contact_person_mail: {
              title: "Contact Person Mail",
              value: "",
              placeholder: "john.williams@company.com",
              type: "input",
            },
            contact_person_number: {
              title: "Contact Person Phone",
              value: "",
              placeholder: "XXXXX - XXXXX",
              countryCodeReq: true,
              type: "number",
            },
            working_days: {
              title: "Working Days",
              value: [],
              placeholder: "",
              type: "days",
            },
            rto: {
              title: "RTO",
              value: false,
              placeholder: "",
              type: "boolean",
            },
          });
        }
        toggleSidebar(); // this toggle will close the right
        // addRowData(res); // add the data to the data grid row
        props.getData();
      })
      .catch((err) => {});
  };

  return (
    <div className="flex flex-col w-[100%] h-[90%] gap-4 p-4">
      <h4 style={{ fontWeight: "600" }}>Add new Warehouse</h4>
      {props.sidebarOpen && 
      <>
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
            <TimePickerValue value={formData[element]?.value} 
            setValue={(v)=>{handleChange(element, v)}}/>
          </>
        ): (
          <></>
        );
      })}
      {formData?.rto?.value && (
        <>
          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={rtoSame}
                onChange={() => {
                  setRtoSame(!rtoSame);
                }}
              />
              &nbsp;&nbsp; Same as above
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label>
              <input
                type="checkbox"
                checked={!rtoSame}
                onChange={() => {
                  setRtoSame(!rtoSame);
                }}
              />
              &nbsp;&nbsp; New Address
            </label>
          </div>
        </>
      )}
      {!rtoSame &&
        formData.rto.value &&
        Object.keys(formDataRTO)?.map((element) => {
          return formDataRTO[element].type === "input" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formDataRTO[element]?.title}
                {formDataRTO[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              <CustomInput
                placeholder={formDataRTO[element]?.placeholder}
                value={formDataRTO[element]?.value}
                onChange={(e) => handleChangeRTO(element, e.target.value)}
              />
            </div>
          ) : formDataRTO[element].type === "number" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formDataRTO[element]?.title}
                {formDataRTO[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              <CustomInput
              number
              countryCodeReq={formData[element]?.countryCodeReq}
                placeholder={formDataRTO[element]?.placeholder}
                value={formDataRTO[element]?.value}
                onChange={(e) => handleChangeRTO(element, e.target.value)}
              />
            </div>
          ) : formDataRTO[element].type === "select" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formDataRTO[element]?.title}
                {formDataRTO[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              {formDataRTO[element]?.options ? (
                <select
                  className="transition block w-full pl-4 h-[40px] rounded-[4px] border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 hover:ring-indigo-600 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => handleChangeRTO(element, e.target.value)}
                >
                  {formDataRTO[element]?.options.length !== 0 ? (
                    formDataRTO[element]?.options?.map((option) => {
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
          ) : formDataRTO[element].type === "days" ? (
            <div className="flex flex-col gap-2">
              <label>
                {formDataRTO[element]?.title}
                {formDataRTO[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
              <ToggleDays
                setData={(days) => {
                  setFormDataRTO((prevFormDataRTO) => ({
                    ...prevFormDataRTO,
                    working_days: {
                      ...prevFormDataRTO["working_days"],
                      value: Array.from(days),
                    },
                  }));
                }}
              />
            </div>
          ) : formDataRTO[element].type === "boolean" ? (
            <div className="flex flex-col gap-2">
              <label>
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={handleCheckboxChange}
                />
                &nbsp;&nbsp;
                {formDataRTO[element]?.title}
                {formDataRTO[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
            </div>
          ): formDataRTO[element].type === "time-picker" ? (
            <>
             <label>
                {formDataRTO[element]?.title}
                {formDataRTO[element]?.required && (
                  <span className="asterisk-span">*</span>
                )}
              </label>
            <TimePickerValue value={formDataRTO[element]?.value} 
            setValue={(v)=>{handleChangeRTO(element, v)}}/>
            </>
          ): (
            <></>
          );
        })}
      <button
        type="submit"
        onClick={handleSubmit}
        className="transition mt-10 mb-2 block w-full pl-4 h-[54px] rounded-[4px] font-semibold leading-6 text-white bg-indigo-500 border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus: hover:bg-indigo-600  "
      >
        {/* Create */}
        {props.dataGiven?"Update":"Create"}
      </button>
      </>}
      <br />
    </div>
  );
};

export default WarehousesSidebarContent;
