import React, { useState } from "react";
import "./style.scss"; // Import your SCSS file

const ToggleDays = (props) => {
  function convertToDayAbbreviations(dayNumbers) {
    const days = ["S", "M", "T", "W", "Th", "F", "St"];
    return dayNumbers.map((num) => days[num - 1]);
  }
  const [selectedDays, setSelectedDays] = useState(
    props.selectedDays
      ? new Set(convertToDayAbbreviations(props.selectedDays))
      : new Set()
  );

  const toggleDay = (day) => {
    setSelectedDays((prevSelectedDays) => {
      const newSelectedDays = new Set(prevSelectedDays);
      if (newSelectedDays.has(day)) {
        newSelectedDays.delete(day);
      } else {
        newSelectedDays.add(day);
      }
      return newSelectedDays;
    });
  };

  React.useEffect(() => {
    console.log(selectedDays);
    console.log("props.selectedDays", props.selectedDays);
    props.setData(selectedDays);
  }, [selectedDays]);

  const days = ["S", "M", "T", "W", "Th", "F", "St"];

  return (
    <div className="ToggleDays-container">
      {days.map((day, index) => (
        <div
          key={index}
          className={`ToggleDays-day${
            selectedDays.has(day) ? " ToggleDays-selectedDay" : ""
          }`}
          onClick={() => toggleDay(day)}
        >
          {day}
        </div>
      ))}
    </div>
  );
};

export default ToggleDays;
