import React, { useState } from 'react';
import './style.scss'

const TimePicker = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const togglePicker = () => {
    setShowPicker(!showPicker);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
    togglePicker();
  };

  const renderTimePicker = () => {
    const times = [
      '12:00 AM', '1:00 AM', '2:00 AM', '3:00 AM', '4:00 AM', '5:00 AM',
      '6:00 AM', '7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM',
      '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
      '6:00 PM', '7:00 PM', '8:00 PM', '9:00 PM', '10:00 PM', '11:00 PM',
    ];

    return (
      <div className="time-picker">
        {times.map((time) => (
          <div
            key={time}
            className={`time-option ${selectedTime === time ? 'selected' : ''}`}
            onClick={() => handleTimeSelection(time)}
          >
            {time}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="time-picker-container">
      <button className="toggle-button" onClick={togglePicker}>
        {selectedTime || 'Select Time'}
      </button>
      {showPicker && renderTimePicker()}
    </div>
  );
};

export default TimePicker;
