import React, { useState } from "react";
import "./style.scss";
import { TextInput } from "../TextField";
import { FaSearch } from "react-icons/fa";
import { Dropdown } from "../Dropdown";

const Table = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);


  const [city, setCity] = React.useState("Option 1");
  const handleRowSelect = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const cities = ["Option 1", "Option 2"];
  return (
    <div className="table-container">
          <div className="table-header">
        <div>
        <Dropdown
            optionName={"Sort"}
            options={cities}
            selectedOption={city}
            setSelectedOption={setCity}
          />   
        &nbsp;&nbsp;
        <Dropdown
            optionName={"Filter"}
            options={cities}
            selectedOption={city}
            setSelectedOption={setCity}
          />   
        </div>
        <div>
            <TextInput text={"Search"} iconRight={<>
      <FaSearch className="search-icon" /></>}/>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th  style={{ width: "24px" }}><input type="checkbox"/></th>
            {Object.keys(data[0]).map((key) => (
              <th key={key}>{key.toUpperCase()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
                <td  style={{ width: "24px" }}>
                <input type="checkbox"/>
              </td>
              {Object.values(row).map((value, i) => (
                <td key={i}>{value}</td>
              ))}
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
