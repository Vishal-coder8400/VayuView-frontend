import React, { useState } from "react";
import { format } from "date-fns"; // Install this using `npm install date-fns`

const DropdownList = ({url, setUrl, selectedDevice}) => {

  const handleSelection = (range) => {
    const now = new Date();
    let startDate, endDate;

    // Calculate start and end dates based on selection
    switch (range) {
      case "day":
        startDate = format(now, "yyyy-MM-dd");
        endDate = format(new Date(now.setDate(now.getDate() + 1)), "yyyy-MM-dd");
        break;
      case "week":
        startDate = format(new Date(now.setDate(now.getDate() - 7)), "yyyy-MM-dd");
        endDate = format(new Date(), "yyyy-MM-dd");
        break;
      case "month":
        startDate = format(new Date(now.setMonth(now.getMonth() - 1)), "yyyy-MM-dd");
        endDate = format(new Date(), "yyyy-MM-dd");
        break;
      case "year":
        startDate = format(new Date(now.setFullYear(now.getFullYear() - 1)), "yyyy-MM-dd");
        endDate = format(new Date(), "yyyy-MM-dd");
        break;
      default:
        return;
    }

    // Set the URL
    const generatedUrl = `aqi-logs-all-id/${startDate}/${endDate}`;
    setUrl(generatedUrl);
    console.log("Generated URL:", generatedUrl);
  };

  React.useEffect(()=>{
    handleSelection("day")
  }, [])
  return (
    <div>
      Range-
      <select
        onChange={(e) => handleSelection(e.target.value)}
        defaultValue="day"
      >
        <option value="" disabled>
          Select Range
        </option>
        <option value="day">Day</option>
        <option value="week">Week</option>
        <option value="month">Month</option>
        <option value="year">Year</option>
      </select>

      {/* {url && (
        <div>
          <p>Generated URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )} */}
    </div>
  );
};

export default DropdownList;