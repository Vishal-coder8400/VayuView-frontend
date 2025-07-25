const rangeMappingWHO = {
  sensor_id: [
    { min: 70, max: 100, color: "#f94144" },
    { min: 60, max: 70, color: "#ffbf06" },
    { min: 30, max: 60, color: "#90be6d" },
    { min: 25, max: 30, color: "#ffbf06" },
    { min: 0, max: 30, color: "#f94144" },
  ],
  "pm2.5": [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  temp: [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  "pm10.0": [
    { min: 0, max: 54, color: "#90be6d" },
    { min: 55, max: 154, color: "#f8961e" },
    { min: 155, max: 254, color: "#f3722c" },
    { min: 255, max: 354, color: "#ee0b00" },
    { min: 355, max: 424, color: "#560bad" },
    { min: 425, max: 500, color: "#472d30" },
  ],
  co2: [
    { min: 400, max: 699, color: "#90be6d" },
    { min: 700, max: 1099, color: "#f8961e" },
    { min: 1100, max: 1599, color: "#f3722c" },
    { min: 1600, max: 2099, color: "#ee0b00" },
    { min: 2100, max: 2500, color: "#472d30" },
  ],
  tvoc: [
    { min: 0, max: 65, color: "#90be6d" },
    { min: 65, max: 220, color: "#f8961e" },
    { min: 220, max: 660, color: "#f3722c" },
    { min: 660, max: 2200, color: "#ee0b00" },
    { min: 2200, max: 5500, color: "#472d30" },
  ],
  hcho: [
    { min: 0.0, max: 0.1, color: "#90be6d" },
    { min: 0.1, max: 1, color: "#472d30" },
  ],
  co: [{ min: 0, max: 9999, color: "#90be6d" }],
  ozone: [{ min: 0, max: 9999, color: "#90be6d" }],
  no2: [{ min: 0, max: 9999, color: "#90be6d" }],
  humidity: [
    { min: 30, max: 59, color: "#90be6d" },
    { min: 25, max: 29, color: "#f8961e" },
    { min: 60, max: 69, color: "#f8961e" },
    { min: 70, max: 100, color: "#ee0b00" },
    { min: 0, max: 24, color: "#ee0b00" },
  ],
};

const rangeMappingUSEPA = {
  sensor_id: [
    { min: 70, max: 100, color: "#f94144" },
    { min: 60, max: 70, color: "#ffbf06" },
    { min: 30, max: 60, color: "#90be6d" },
    { min: 25, max: 30, color: "#ffbf06" },
    { min: 0, max: 30, color: "#f94144" },
  ],
  "pm2.5": [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#90be6d" },
  ],
  temp: [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  "pm10.0": [
    { min: 0, max: 54, color: "#90be6d" },
    { min: 55, max: 154, color: "#f8961e" },
    { min: 155, max: 254, color: "#f3722c" },
    { min: 255, max: 354, color: "#ee0b00" },
    { min: 355, max: 424, color: "#560bad" },
    { min: 425, max: 500, color: "#472d30" },
  ],
  co2: [
    { min: 400, max: 699, color: "#90be6d" },
    { min: 700, max: 1099, color: "#f8961e" },
    { min: 1100, max: 1599, color: "#f3722c" },
    { min: 1600, max: 2099, color: "#ee0b00" },
    { min: 2100, max: 2500, color: "#472d30" },
  ],
  tvoc: [
    { min: 0, max: 65, color: "#90be6d" },
    { min: 65, max: 220, color: "#f8961e" },
    { min: 220, max: 660, color: "#f3722c" },
    { min: 660, max: 2200, color: "#ee0b00" },
    { min: 2200, max: 5500, color: "#472d30" },
  ],
  hcho: [
    { min: 0.0, max: 0.1, color: "#90be6d" },
    { min: 0.1, max: 1, color: "#472d30" },
  ],
  co: [{ min: 0, max: 9999, color: "#90be6d" }],
  ozone: [{ min: 0, max: 9999, color: "#90be6d" }],
  no2: [{ min: 0, max: 9999, color: "#90be6d" }],
  humidity: [
    { min: 30, max: 59, color: "#90be6d" },
    { min: 25, max: 29, color: "#f8961e" },
    { min: 60, max: 69, color: "#f8961e" },
    { min: 70, max: 100, color: "#ee0b00" },
    { min: 0, max: 24, color: "#ee0b00" },
  ],
};

const rangeMappingCPCB = {
  sensor_id: [
    { min: 70, max: 100, color: "#f94144" },
    { min: 60, max: 70, color: "#ffbf06" },
    { min: 30, max: 60, color: "#90be6d" },
    { min: 25, max: 30, color: "#ffbf06" },
    { min: 0, max: 30, color: "#f94144" },
  ],
  "pm2.5": [
    { min: 0.0, max: 30.0, color: "#90be6d" },
    { min: 30.5, max: 60.0, color: "#f8961e" },
    { min: 60.5, max: 90.0, color: "#f3722c" },
    { min: 90.5, max: 120.0, color: "#ee0b00" },
    { min: 120.5, max: 250.0, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  temp: [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  "pm10.0": [
    { min: 0, max: 50, color: "#90be6d" },
    { min: 51, max: 100, color: "#f8961e" },
    { min: 101, max: 250, color: "#f3722c" },
    { min: 251, max: 350, color: "#ee0b00" },
    { min: 351, max: 430, color: "#560bad" },
    { min: 431, max: 500, color: "#472d30" },
  ],
  co2: [
    { min: 0, max: 1, color: "#90be6d" },
    { min: 1.1, max: 2.0, color: "#f8961e" },
    { min: 2.1, max: 10, color: "#f3722c" },
    { min: 10.1, max: 17, color: "#ee0b00" },
    { min: 17.1, max: 2500, color: "#472d30" },
  ],
  tvoc: [
    { min: 0, max: 65, color: "#90be6d" },
    { min: 65, max: 220, color: "#f8961e" },
    { min: 220, max: 660, color: "#f3722c" },
    { min: 660, max: 2200, color: "#ee0b00" },
    { min: 2200, max: 5500, color: "#472d30" },
  ],
  hcho: [
    { min: 0.0, max: 0.1, color: "#90be6d" },
    { min: 0.1, max: 1, color: "#472d30" },
  ],
  co: [{ min: 0, max: 1, color: "#90be6d" },
    { min: 1.1, max: 2.0, color: "#f8961e" },
    { min: 2.1, max: 10, color: "#f3722c" },
    { min: 10.1, max: 17, color: "#ee0b00" },
    { min: 17.1, max: 2500, color: "#472d30" },],
  ozone: [{ min: 0, max: 50, color: "#90be6d" },
    { min: 51, max: 100, color: "#f8961e" },
    { min: 101, max: 168, color: "#f3722c" },
    { min: 169, max: 208, color: "#ee0b00" },
    { min: 209, max: 748, color: "#560bad" },
    { min: 749, max: 2500, color: "#472d30" },],
  no2: [{ min: 0, max: 9999, color: "#90be6d" }],
  humidity: [
    { min: 30, max: 59, color: "#90be6d" },
    { min: 25, max: 29, color: "#f8961e" },
    { min: 60, max: 69, color: "#f8961e" },
    { min: 70, max: 100, color: "#ee0b00" },
    { min: 0, max: 24, color: "#ee0b00" },
  ],
};

const rangeMappingISHRAE_ASHRAE = {
  sensor_id: [
    { min: 70, max: 100, color: "#f94144" },
    { min: 60, max: 70, color: "#ffbf06" },
    { min: 30, max: 60, color: "#90be6d" },
    { min: 25, max: 30, color: "#ffbf06" },
    { min: 0, max: 30, color: "#f94144" },
  ],
  "pm2.5": [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  temp: [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  "pm10.0": [
    { min: 0, max: 54, color: "#90be6d" },
    { min: 55, max: 154, color: "#f8961e" },
    { min: 155, max: 254, color: "#f3722c" },
    { min: 255, max: 354, color: "#ee0b00" },
    { min: 355, max: 424, color: "#560bad" },
    { min: 425, max: 500, color: "#472d30" },
  ],
  co2: [
    { min: 400, max: 699, color: "#90be6d" },
    { min: 700, max: 1099, color: "#f8961e" },
    { min: 1100, max: 1599, color: "#f3722c" },
    { min: 1600, max: 2099, color: "#ee0b00" },
    { min: 2100, max: 2500, color: "#472d30" },
  ],
  tvoc: [
    { min: 0, max: 65, color: "#90be6d" },
    { min: 65, max: 220, color: "#f8961e" },
    { min: 220, max: 660, color: "#f3722c" },
    { min: 660, max: 2200, color: "#ee0b00" },
    { min: 2200, max: 5500, color: "#472d30" },
  ],
  hcho: [
    { min: 0.0, max: 0.1, color: "#90be6d" },
    { min: 0.1, max: 1, color: "#472d30" },
  ],
  co: [{ min: 0, max: 9999, color: "#90be6d" }],
  ozone: [{ min: 0, max: 9999, color: "#90be6d" }],
  no2: [{ min: 0, max: 9999, color: "#90be6d" }],
  humidity: [
    { min: 30, max: 59, color: "#90be6d" },
    { min: 25, max: 29, color: "#f8961e" },
    { min: 60, max: 69, color: "#f8961e" },
    { min: 70, max: 100, color: "#ee0b00" },
    { min: 0, max: 24, color: "#ee0b00" },
  ],
};

const rangeMappingEPA_VICTORIA_AUSTRALIA = {
  sensor_id: [
    { min: 70, max: 100, color: "#f94144" },
    { min: 60, max: 70, color: "#ffbf06" },
    { min: 30, max: 60, color: "#90be6d" },
    { min: 25, max: 30, color: "#ffbf06" },
    { min: 0, max: 30, color: "#f94144" },
  ],
  "pm2.5": [
    { min: 0.0, max: 12.5, color: "#90be6d" },
    { min: 12.6, max: 25.4, color: "#f8961e" },
    { min: 25.5, max: 50.4, color: "#f3722c" },
    { min: 50.5, max: 100.4, color: "#ee0b00" }, 
    { min: 100.5, max: 150.5, color: "#472d30" },
  ],
  temp: [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  "pm10.0": [
    { min: 0, max: 40, color: "#90be6d" },
    { min: 40.6, max: 80.4, color: "#f8961e" },
    { min: 80.5, max: 120.4, color: "#f3722c" },
    { min: 120.5, max: 300.4, color: "#ee0b00" },
    // { min: 355, max: 424, color: "#560bad" },
    { min: 300.5, max: 500, color: "#472d30" },
  ],
  co2: [
    { min: 400, max: 699, color: "#90be6d" },
    { min: 700, max: 1099, color: "#f8961e" },
    { min: 1100, max: 1599, color: "#f3722c" },
    { min: 1600, max: 2099, color: "#ee0b00" },
    { min: 2100, max: 2500, color: "#472d30" },
  ],
  tvoc: [
    { min: 0, max: 65, color: "#90be6d" },
    { min: 65, max: 220, color: "#f8961e" },
    { min: 220, max: 660, color: "#f3722c" },
    { min: 660, max: 2200, color: "#ee0b00" },
    { min: 2200, max: 5500, color: "#472d30" },
  ],
  hcho: [
    { min: 0.0, max: 0.1, color: "#90be6d" },
    { min: 0.1, max: 1, color: "#472d30" },
  ],
  co: [{ min: 0, max: 9999, color: "#90be6d" }],
  ozone: [{ min: 0, max: 9999, color: "#90be6d" }],
  no2: [{ min: 0, max: 9999, color: "#90be6d" }],
  humidity: [
    { min: 30, max: 59, color: "#90be6d" },
    { min: 25, max: 29, color: "#f8961e" },
    { min: 60, max: 69, color: "#f8961e" },
    { min: 70, max: 100, color: "#ee0b00" },
    { min: 0, max: 24, color: "#ee0b00" },
  ],
};


const rangeMappingEPA_AIR_WATCH = {
  sensor_id: [
    { min: 70, max: 100, color: "#f94144" },
    { min: 60, max: 70, color: "#ffbf06" },
    { min: 30, max: 60, color: "#90be6d" },
    { min: 25, max: 30, color: "#ffbf06" },
    { min: 0, max: 30, color: "#f94144" },
  ],
  "pm2.5": [
    { min: 0.0, max: 12.5, color: "#90be6d" },
    { min: 12.6, max: 25.4, color: "#f8961e" },
    { min: 25.5, max: 50.4, color: "#f3722c" },
    { min: 50.5, max: 100.4, color: "#ee0b00" }, 
    { min: 100.5, max: 150.5, color: "#472d30" },
  ],
  temp: [
    { min: 0.0, max: 12.0, color: "#90be6d" },
    { min: 12.1, max: 35.4, color: "#f8961e" },
    { min: 35.5, max: 55.4, color: "#f3722c" },
    { min: 55.5, max: 150.4, color: "#ee0b00" },
    { min: 150.5, max: 250.4, color: "#560bad" },
    { min: 250.5, max: 400, color: "#472d30" },
  ],
  "pm10.0": [
    { min: 0, max: 40, color: "#90be6d" },
    { min: 40.6, max: 80.4, color: "#f8961e" },
    { min: 80.5, max: 120.4, color: "#f3722c" },
    { min: 120.5, max: 300.4, color: "#ee0b00" },
    // { min: 355, max: 424, color: "#560bad" },
    { min: 300.5, max: 500, color: "#472d30" },
  ],
  co2: [
    { min: 400, max: 699, color: "#90be6d" },
    { min: 700, max: 1099, color: "#f8961e" },
    { min: 1100, max: 1599, color: "#f3722c" },
    { min: 1600, max: 2099, color: "#ee0b00" },
    { min: 2100, max: 2500, color: "#472d30" },
  ],
  tvoc: [
    { min: 0, max: 65, color: "#90be6d" },
    { min: 65, max: 220, color: "#f8961e" },
    { min: 220, max: 660, color: "#f3722c" },
    { min: 660, max: 2200, color: "#ee0b00" },
    { min: 2200, max: 5500, color: "#472d30" },
  ],
  hcho: [
    { min: 0.0, max: 0.1, color: "#90be6d" },
    { min: 0.1, max: 1, color: "#472d30" },
  ],
  co: [{ min: 0, max: 9999, color: "#90be6d" }],
  ozone: [{ min: 0, max: 9999, color: "#90be6d" }],
  no2: [{ min: 0, max: 9999, color: "#90be6d" }],
  humidity: [
    { min: 30, max: 59, color: "#90be6d" },
    { min: 25, max: 29, color: "#f8961e" },
    { min: 60, max: 69, color: "#f8961e" },
    { min: 70, max: 100, color: "#ee0b00" },
    { min: 0, max: 24, color: "#ee0b00" },
  ],
};

// Function to get color for a parameter and value
function getColorForParam(color_standard, param, value) {
  try {
    let rangeMapping = {};
    if (color_standard === "WHO") {
      rangeMapping = rangeMappingWHO;
    } else if (color_standard === "USEPA") {
      rangeMapping = rangeMappingUSEPA;
    } else if (color_standard === "CPCB") {
      rangeMapping = rangeMappingCPCB;
    } else if (color_standard === "EPA AIR WATCH") {
      rangeMapping = rangeMappingEPA_AIR_WATCH;
    } else if (color_standard === "EPA VICTORIA AUSTRALIA") {
      rangeMapping = rangeMappingEPA_VICTORIA_AUSTRALIA;
    } else {
      rangeMapping = rangeMappingISHRAE_ASHRAE;
    }
    const ranges = rangeMapping[param];
    if (!ranges) {
      return "#000"; // Default color if param not found
    }

    // Find the correct range for the value
    const range = ranges.find(
      (range) => value >= range.min && value <= range.max
    );

    return range ? range.color : "#000"; // Default color if value is out of range
  } catch (e) {
    return "0";
  }
}

const getRangeMapping = (color_standard) => {
  let rangeMapping = {};
  if (color_standard === "WHO") {
    rangeMapping = rangeMappingWHO;
  } else if (color_standard === "USEPA") {
    rangeMapping = rangeMappingUSEPA;
  } else if (color_standard === "CPCB") {
    rangeMapping = rangeMappingCPCB;
  } else if (color_standard === "EPA AIR WATCH") {
    rangeMapping = rangeMappingEPA_AIR_WATCH;
  } else if (color_standard === "EPA VICTORIA AUSTRALIA") {
    rangeMapping = rangeMappingEPA_VICTORIA_AUSTRALIA;
  } else {
    rangeMapping = rangeMappingISHRAE_ASHRAE;
  }
  return rangeMapping;
};

module.exports.getRangeMapping = getRangeMapping;
module.exports.getColorForParam = getColorForParam;
