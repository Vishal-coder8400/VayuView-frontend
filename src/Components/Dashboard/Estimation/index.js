import React, { useEffect, useRef, useState } from "react";
import Table from "../../../common/core/Table";
import { Button } from "../../../common/core/Button";
import { FaDownload, FaIcons } from "react-icons/fa";
import NoRecords from "../../../common/core/NoRecords";
import "./style.scss";
import { MapIcon } from "../../../common/icons/MapIcon";
import { Dropdown } from "../../../common/core/Dropdown";
import { getBaseURL } from "../../../common/constant/urls";
import axios from "axios";
import { callApi } from "../../../utils/api";
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
            <th>Volumetric Weight</th>
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
                <input type="text" value={box.volumetric_weight} disabled step=".01"/>
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
const AutocompleteDropdown = (props) => {
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [optionVisibility, setOptionVisibility] = useState(true);
  const wrapperRef = useRef(null);
  useEffect(()=>{ 
      props.setInputValue(inputValue)
  }, [inputValue])
  useEffect(() => {
    // Fetch the facility data
    const fetchFacilities = async () => {
      try {
        const response = await axios.get(getBaseURL() + "/api/pincodes");
        setOptions(response.data.data);
        setFilteredOptions(response.data.data); // Initially, no filter is applied
      } catch (error) {
        console.error("Error fetching facilities:", error);
      }
    };

    fetchFacilities();
  }, []);

  useEffect(() => {
    // Filter options based on input value
    const newFilteredOptions = options.filter((option) =>
      option?.toLowerCase().includes(inputValue?.toLowerCase())
    );
    setFilteredOptions(newFilteredOptions);
    setOptionVisibility(true);
  }, [inputValue, options]);

  // Listen for clicks outside of the component
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        // setInputValue(''); // Clear the input value or close the dropdown
        setOptionVisibility(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef}>
      {" "}
      {/* Attach the ref to the root element */}
      <input
        type="text"
        className="login-input-half"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search by Pin or Location..."
      />
      {inputValue && optionVisibility && (
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            margin: 0,
            position: "absolute",
            zIndex: 1,
            backgroundColor: "white",
            border: "1px solid #ccc",
            width: "300px",
          }}
        >
          {filteredOptions.map((option, index) => (
            <li
              key={index}
              style={{ padding: "10px", cursor: "pointer" }}
              onClick={() => setInputValue(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

function Estimation() {
  const data = [];
  const [citySelected, setCitySelected] = useState(null);
  const [destinationCitySelected, setDestinationCity] = useState(null);
  const [shipmentType, setShipmentType] = useState("PRE-PAID");
  const [dimensionType, setDimensionType] = useState("CENTIMETER");
  const [riskManagementType, setRiskManagementType] = useState("Owner Risk");
  const [cod, setCOD] = useState("");
  const [invoice_value, setInvoice_value] = useState("");
  const [actual_weight, setActual_weight] = useState("");
  const [boxValues, setBoxValues] = useState([]);
  const [appointment_charges, setAppointmentCharges] = useState(false)

  const [calculatedResult, setCalculatedResult] = useState({

  })

  const calculate = async() => {
    const rateCardValues = {
      origin_pincode: citySelected,
      destination_pincode: destinationCitySelected,
      type_of_shipment: shipmentType,
      freight_on_value: riskManagementType,
      invoice_value: invoice_value,
      actual_weight: actual_weight,
      dimension_type: dimensionType,
      box_dimenstions: boxValues,
      appointment_charges: appointment_charges,
      cod: cod
    };
    console.log(rateCardValues);
    await callApi({
      method: 'POST',
      endpoint: "api/calculate",
      data: rateCardValues,
      alert: true
    }).then((data)=>{
      setCalculatedResult(data)
    }).catch(()=>{

    })
  
  };

  return (
    <div className="section-wrapper">
      <div className="section-header">
        <div>
          <br />
          <h2 className="text-[24px] ml-5 mt-2">Estimation</h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <Button text={"Add Warehouse +"} />{" "}
            <Button text={<><FaDownload /></>} squareOutlined/>
             */}
        </div>
      </div>
      <div className="estimation-section-wrapper">
        <div className="estimation-section-left">
          {/* <h3 style={{fontWeight: 300, marginTop: -20}}>Get Cheapest Freight Rate Estimation</h3> */}

          <div className="two-inputs">
            <div className="two-inputs-section">
              <label className="input-label">Origin Pincode</label>
              <AutocompleteDropdown setInputValue={setCitySelected}/>
              <div className="city-selected">
                <MapIcon fill={"#707070"} />
                &nbsp;&nbsp;{citySelected ? citySelected : <>Origin City</>}
              </div>
            </div>
            <div className="two-inputs-section">
              <label className="input-label">Destination Pincode</label>
              <AutocompleteDropdown setInputValue={setDestinationCity}/>
              <div className="city-selected">
                <MapIcon fill={"#707070"} />
                &nbsp;&nbsp;
                {destinationCitySelected ? (
                  destinationCitySelected
                ) : (
                  <>Destination City</>
                )}
              </div>
            </div>
          </div>
          <hr />
          <label className="heading-custom">Frieght Estimation</label>
          {shipmentType === "PRE-PAID" ? (
            <>
              <div className="flex-col">
                <label className="input-label">Type of Shipment</label>
                <Dropdown
                  inputLike={true}
                  optionName={""}
                  options={["PRE-PAID", "Cash On Delivery (Invoice)"]}
                  selectedOption={shipmentType}
                  setSelectedOption={setShipmentType}
                />
              </div>
            </>
          ) : (
            <>
              <div className="two-inputs">
                <div className="two-inputs-section">
                  <label className="input-label">Type of Shipment</label>
                  <Dropdown
                    inputLike={true}
                    optionName={""}
                    options={["PRE-PAID", "Collect On Delivery"]}
                    selectedOption={shipmentType}
                    setSelectedOption={setShipmentType}
                  />
                  {/* <input
                className="login-input-half"
                placeholder="PRE-PAID"
                onChange={(e) => {}}
              ></input> */}
                </div>
                <div className="two-inputs-section">
                  <label className="input-label">COD Amount</label>
                  <input
                    className="login-input-half"
                    placeholder="XXX"
                    value={cod}
                    onChange={(e) => {setCOD(e.target.value)}}
                  ></input>
                </div>
              </div>
            </>
          )}
          <hr />
          <label className="heading-custom">Frieght On Value</label>
          <div className="flex-col">
            {/* <div> */}
            <label className="input-label">Risk Management</label>
            {/* </div> */}
            <div>
              <Dropdown
                inputLike={true}
                optionName={""}
                options={["Owner Risk", "Carrier Risk", "Insurance"]}
                selectedOption={riskManagementType}
                setSelectedOption={setRiskManagementType}
              />

              {/* <input
                className="login-input-half"
                placeholder="PRE-PAID"
                onChange={(e) => {}}
              ></input> */}
              <div className="disclaimer">
                * NOTE:{" "}
                {riskManagementType === "Owner Risk"
                  ? "₹ 350/- for a liability of ₹ 2,000/-"
                  : riskManagementType === "Carrier Risk"
                  ? "2% of Invoice value for 50% Shipment value insured"
                  : "3% of Invoice value for 100% Shipment Insured"}
              </div>
            </div>
          </div>
          <hr />
          
            <div style={{display:'flex', flexDirection: 'row', width: '100px'}}>
              
            <input
                className="login-input"
                style={{width:'20px'}}
                placeholder="100"
                type="checkbox"
                checked={appointment_charges}
                onChange={(e) => {
                  setAppointmentCharges(e.target.checked);
                }}
              ></input>
              <label className="heading-custom" style={{marginTop: 8, marginLeft: 8}}>Appointment Delivery</label>
            </div>
          
          <hr />
          <div className="two-inputs">
            <div>
              <label className="heading-custom">Invoice Amount</label>
              <br />

              <label className="input-label">Invoice Value in Rs</label>

              <input
                className="login-input"
                placeholder="100"
                value={invoice_value}
                onChange={(e) => {
                  setInvoice_value(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label className="heading-custom">Actual/Dead Weight</label>
              <br />
              <label className="input-label">Total Shipment Weight in kg</label>
              <input
                className="login-input"
                placeholder="100"
                value={actual_weight}
                onChange={(e) => {
                  setActual_weight(e.target.value);
                }}
              ></input>
            </div>
          </div>
          <hr />
          <label className="heading-custom">Dimensions</label>
          <br />
          <Dropdown
            inputLike={true}
            optionName={""}
            options={["CENTIMETER", "INCH"]}
            selectedOption={dimensionType}
            setSelectedOption={setDimensionType}
          />
          <br />
          <br />
          <BoxTable
            dimension={dimensionType === "CENTIMETER" ? "(cm)" : "(in)"}
            dimensionType={dimensionType}
            setBoxValues={setBoxValues}
          />
          <button
            onClick={() => {
              calculate();
            }}
            className="add-row-button"
            style={{ fontSize: 18, float: "right" }}
          >
            Calculate Estimation
          </button>
        </div>
        <div className="estimation-section-right">
          <div className="estimated-result--summary-table">
            <h4 className="estimated-header">Calculation Breakup</h4>
            {/* {JSON.stringify(calculatedResult)} */}
            <table className="estimated-result--table">
              <thead>
                <tr>
                  <th className="estimated-result--table-header"></th>
                  <th className="estimated-result--table-header"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="estimated-result--table-cell">
                    Charged Weight (kg)
                  </td>
                  <td className="estimated-result--table-cell-value">{calculatedResult?.charged_weight}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Base Freight Charges
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.base_freight_charges}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Docket Charges
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.docket_charge}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Fuel Surcharge
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.fuel_surcharge}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Insurance/FOV/ROV
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.fov}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    COD Charge
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.codCharge}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    First Mile ODA Charges
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.first_mile_oda_charges}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Last Mile ODA Charges
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.last_mile_oda_charges}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Handling Charges
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.handling_charge}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Appointment Charges
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.appointment}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">Green Tax</td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.green_tax}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Mathadi/Hamali
                  </td>
                  <td className="estimated-result--table-cell-value">Actuals</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">
                    Total Freight
                  </td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.total_freight}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-cell">GST at 18%</td>
                  <td className="estimated-result--table-cell-value">₹ {calculatedResult?.gst}</td>
                </tr>
                <tr>
                  <td className="estimated-result--table-footer">Total</td>
                  <td className="estimated-result--table-footer">₹ {calculatedResult?.total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Estimation;
