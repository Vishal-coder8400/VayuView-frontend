import React, { useState } from "react";
import CustomInput from "../../../common/core/CustomInput";
import { callApi } from "../../../utils/api";
import Error from "../../../utils/Error";
import ToggleDays from "../../Dashboard/Warehouses/ToggleWeek";
import { store } from "../../../store";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "react-time-picker";
import { isEmpty, times } from "lodash";

function TimePickerValue(props) {
  // const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  function convertToISOWithGivenTime(timeString) {
    ////alert("working here", timeString);
    // Split the timeString into hours and minutes

    let [hours, minutes] = timeString.split(":").map(Number);

    // Create a new Date object with today's date
    let date = new Date();

    // Set the provided hours and minutes
    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(0);
    date.setMilliseconds(0);
    console.log(timeString, hours, minutes, date, "DATEEEE");

    let isoDateString = date.toISOString();

    return isoDateString;
  }

  // const [value, onChange] = useState('10:00');
  return (
    <TimePicker
      onChange={(v) => {
        props.setValue(v);
      }}
      value={props.value}
    />
  );
}

const DeliverySidebarContentEdit = (props) => {
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
  
  });
  const [rtoSame, setRtoSame] = useState(true);
  function convertToDayAbbreviations(dayNumbers) {
    const days = ["S", "M", "T", "W", "Th", "F", "St"];
    return dayNumbers.map((num) => days[num - 1]);
  }
  function removeKeys(obj, keys) {
    return Object.keys(obj).reduce((acc, key) => {
      if (!keys.includes(key)) {
        acc[key] = obj[key];
      }
      return acc;
    }, {});
  }
  
  React.useEffect(() => {
    console.log(props.dataGiven, 'props.dataGiven')
    let dG = props.dataGiven
    const newObj = removeKeys(dG, ['scheduled_start_time', 'scheduled_end_time', 'working_days', 'rto', 'rto_address']);
    if (!isEmpty(props.dataGiven)) {
      setFormData({
        ...newObj,
        contact_person_number: {
          title: "Contact Person Phone",
          value: props.dataGiven.contact_person_number.value,
          placeholder: "XXXXX - XXXXX",
          countryCodeReq: true,
          type: "number",
          required: true,
        },
      });

      console.log("FORMDATA", props.dataGiven);
      if (!isEmpty(props.dataGiven.rto_address)) {
        setRtoSame(false);
        const mapping = {
          warehouse_name: "warehouse_name",
          warehouse_address: "warehouse_address",
          warehouse_city: "warehouse_city",
          warehouse_state: "warehouse_state",
          warehouse_country: "warehouse_country",
          postal_code: "postal_code",
          warehouse_contact_person: "contact_person",
          warehouse_person_email: "contact_person_mail",
          warehouse_contact_phone: "contact_person_number",
        };

        const updatedFormData = {
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
        };
        const tempData = {};
        Object.entries(mapping).forEach(([rowKey, formKey]) => {
          if (rowKey !== "rto") {
            tempData[rowKey] = {
              title: updatedFormData[rowKey]?.title,
              value: props.dataGiven?.rto_address?.value?.[rowKey],
              placeholder: updatedFormData[rowKey]?.placeholder,
              type: updatedFormData[rowKey]?.type,
              required: updatedFormData[rowKey]?.required,
            };
          }
        });
        console.log(tempData, "TEMPDATAUPLOADED");
        setFormDataRTO({ ...formDataRTO, ...tempData });
      }
    }
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

  const handleChangeRTO = (fieldName, value) => {
    console.log(fieldName, value, "THIS IS VALUE");
    setFormDataRTO((prevFormData) => ({
      ...prevFormData,
      [fieldName]: { ...prevFormData[fieldName], value },
    }));
  };
  function convertDaystoNum(dayNumbers) {
    const days = ["S", "M", "T", "W", "Th", "F", "St"];
    if(dayNumbers === undefined){
      return []
    }
    return dayNumbers.map((num) => days.indexOf(num));
  }
  const handleSubmit = async (e) => {
    console.log(formData, 'FORMDATA')
    let keys = Object.keys(formData);
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] === "contact_person_mail") {
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
    
    console.log(dataObject, dataObject['working_days'], 'FORMDATA dataObject')
    dataObject["working_days"] = convertDaystoNum(
      dataObject["working_days"]
    );

    let RTOkeys = Object.keys(formDataRTO);
    let RTOdataObject = {};
    RTOkeys.forEach((keyRTO) => {
      RTOdataObject = {
        [keyRTO]: formDataRTO[keyRTO]?.value,
        ...RTOdataObject,
      };
    });
    RTOdataObject["working_days"] = convertDaystoNum(
      RTOdataObject["working_days"]
    );
    dataObject = {
      ...dataObject,
      user_id: store.getState().userData?.user?.oid,
    };
    if(dataObject.contact_person_number.length!==10){
      Error("Phone number must be of 10 digits");
      return;
    }
    dataObject['warehouse_contact_person'] = dataObject.contact_person
    dataObject['warehouse_person_email'] = dataObject.contact_person_mail
    dataObject['warehouse_contact_phone'] = dataObject.contact_person_number
    console.log(dataObject, props.selectedWarehouse, "UPDATING.");
    await callApi({
      method: props.dataGiven ? "PATCH" : "POST", //props.dataGiven ? "PATCH" :
      endpoint: props.dataGiven
        ? "api/delivery/" + props.selectedWarehouse
        : "api/delivery", //+ (props.dataGiven ? dataObject['id'] : ""),
      data: dataObject,
      alert: true,
    })
      .then((res) => {
        props.setSelectedWarehouse("")
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
              required: true,
              type: "number",
            },
            working_days: {
              title: "Working Days",
              value: [],
              placeholder: "",
              type: "days",
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
      <h4 style={{ fontWeight: "600" }}>Update Delivery Location</h4>
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
              // countryCodeReq={formData[element]?.countryCodeReq}
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
              selectedDays={formData[element]?.value}
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
            />
          </>
        ) : (
          <></>
        );
      })}
      <button
        type="submit"
        onClick={handleSubmit}
        className="transition mt-10 mb-2 block w-full pl-4 h-[54px] rounded-[4px] font-semibold leading-6 text-white bg-indigo-500 border-0 py-1.5 text-gray-900  ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus: hover:bg-indigo-600  "
      >
        {/* Create */}
        {props.dataGiven ? "Update" : ""}
      </button>
      <br />
    </div>
  );
};

export default DeliverySidebarContentEdit;