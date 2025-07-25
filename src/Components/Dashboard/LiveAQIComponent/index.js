import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { callApi } from "../../../utils/api";
import Gauge from "react-gauge-component";
import TimeSeriesChart from "./TimeSeriesChart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { RxDoubleArrowDown } from "react-icons/rx";
import DropdownList from "./DropdownList";
import "react-circular-progressbar/dist/styles.css";
import ShimmerLoader from "./ShimmerUpdated";
import axios from "axios";
import { saveAs } from "file-saver";
import { getBaseURL } from "../../../common/constant/urls";
import { getCompanyId, getUserId, getUserRole } from "../../../utils/roles";
import DownloadAQIExcel from "./DownloadAQIExcel"

const NoDataMessage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "200px", color: "#666" }}>
      <FontAwesomeIcon icon={faExclamationTriangle} size="3x" color="#ffcc00" />
      <h3>No data for this device</h3>
      <p>Please check the device or try again later.</p>
    </div>
  );
};



const AQIPage = () => {
  const [data, setData] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [devices, setDevices] = useState([]);
  const [rows, setRows] = useState({
    indoor_humidity: [],
    indoor_temp: [],
    indoor_pm2_5: [],
    indoor_pm10_0: [],
    indoor_co2: [],
    indoor_tvoc: [],
    indoor_hcho: [],
  });

  const getCustomerData = async () => {
    try {
      const res = await callApi({ endpoint: getUserRole() === "useradmin"
        ? "api/AirQualityDevice?customerId=" + getCompanyId()
        : getUserRole() === "executive"
        ? "api/AirQualityDevice?assignedUserId=" + getUserId()
        : "api/AirQualityDevice" });
      const deviceOptions = res?.data?.map((device) => ({
        id: device.deviceId,
        name: device.locationName,
      }));
      setDevices(deviceOptions);
      setSelectedDevice(deviceOptions[0]?.id); // Select the first device by default
    } catch (err) {
      console.error("Error fetching devices:", err);
    }
  };

  const [url, setUrl] = useState("");
  const [indoor_avg, setIndoor_avg] = useState({});
  const [loading, setLoading] = useState(false);
  const getData = () => {
    (async () => {
      setLoading(true);
      await callApi({
        // endpoint: "aqi-logs/" + selectedDevice,
        endpoint: url+'/'+selectedDevice,
      })
        .then((res) => {
          setLoading(false);
          const dayWiseData = {};
          setIndoor_avg(res.indoor_avg);

          // Calculate daily averages for each parameter
          let result = transformData(res.data);
          setRows(result);
          // setAvgRows(averagedData); // set processed data to state
        })
        .catch((err) => {
          console.log(err, "data giving.......");
        });
    })();
  };

  const average = (arr) => {
    const sum = arr.reduce((a, b) => a + b, 0);
    return arr.length > 0 ? (sum / arr.length).toFixed(2) : "N/A";
  };

  useEffect(() => {
    getData();
  }, [selectedDevice, url]);

  useEffect(() => {
    getCustomerData();
    getData();
  }, []);

  const getAreaColor = (value) => {
    if (value <= 50) return "#4CAF50";
    if (value <= 100) return "#FFEB3B";
    return "#F44336";
  };
  // Calculate average, min, and max for a parameter
  const calculateStats = (param) => {
    const values = data.map((d) => d[param]);
    const sum = values.reduce((acc, val) => acc + val, 0);
    const avg = (sum / values.length).toFixed(2);
    const min = Math.min(...values);
    const max = Math.max(...values);
    return { avg, min, max };
  };

  const renderAreaGraph = (param, label) => {
    const stats = calculateStats(param);
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          marginBottom: "10px",
          paddingLeft: "10px",
          paddingRight: "10px",
        }}
      >
        <div style={{ width: "15%", textAlign: "left", paddingRight: "10px" }}>
          <strong>{label}</strong>
          <p>Avg: {stats.avg}</p>
          <p>
            Min: {stats.min} - Max: {stats.max}
          </p>
        </div>
        <div style={{ width: "85%" }}>
          <ResponsiveContainer width="100%" height={100}>
            <AreaChart data={rows}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Area
                type="monotone"
                dataKey={param}
                fill={getAreaColor(stats.avg)}
                stroke={getAreaColor(stats.avg)}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  function transformData(data) {
    const result = {
      indoor_humidity: [],
      indoor_temp: [],
      indoor_pm2_5: [],
      indoor_pm10_0: [],
      indoor_co2: [],
      indoor_tvoc: [],
      indoor_hcho: [],
    };

    data.forEach((entry) => {
      const { timestamp, indoor_air_quality } = entry;

      indoor_air_quality.forEach((measurement) => {
        const { param, value } = measurement;

        switch (param) {
          case "humidity":
            result.indoor_humidity.push({ timestamp, value });
            break;
          case "temp":
            result.indoor_temp.push({ timestamp, value });
            break;
          case "pm2.5":
            result.indoor_pm2_5.push({ timestamp, value });
            break;
          case "pm10.0":
            result.indoor_pm10_0.push({ timestamp, value });
            break;
          case "co2":
            result.indoor_co2.push({ timestamp, value });
            break;
          case "tvoc":
            result.indoor_tvoc.push({ timestamp, value });
            break;
          case "hcho":
            result.indoor_hcho.push({ timestamp, value });
            break;
          default:
            break;
        }
      });
    });

    return result;
  }

  function calculateAQIPM25PM10(pm25 = null, pm10 = null) {
    const aqiBreakpoints = {
      pm25: [
        { min: 0, max: 30, aqiMin: 0, aqiMax: 50 },
        { min: 31, max: 60, aqiMin: 51, aqiMax: 100 },
        { min: 61, max: 90, aqiMin: 101, aqiMax: 200 },
        { min: 91, max: 120, aqiMin: 201, aqiMax: 300 },
        { min: 121, max: 250, aqiMin: 301, aqiMax: 400 },
        { min: 251, max: 500, aqiMin: 401, aqiMax: 500 },
      ],
      pm10: [
        { min: 0, max: 50, aqiMin: 0, aqiMax: 50 },
        { min: 51, max: 100, aqiMin: 51, aqiMax: 100 },
        { min: 101, max: 250, aqiMin: 101, aqiMax: 200 },
        { min: 251, max: 350, aqiMin: 201, aqiMax: 300 },
        { min: 351, max: 430, aqiMin: 301, aqiMax: 400 },
        { min: 431, max: 600, aqiMin: 401, aqiMax: 500 },
      ],
    };

    function calculateSubIndex(concentration, breakpoints) {
      for (let i = 0; i < breakpoints.length; i++) {
        const bp = breakpoints[i];
        if (concentration >= bp.min && concentration <= bp.max) {
          return (
            ((bp.aqiMax - bp.aqiMin) / (bp.max - bp.min)) *
              (concentration - bp.min) +
            bp.aqiMin
          );
        }
      }
      return -1; // Return -1 if concentration is out of range
    }

    let pm25SubIndex =
      pm25 !== null ? calculateSubIndex(pm25, aqiBreakpoints.pm25) : null;
    let pm10SubIndex =
      pm10 !== null ? calculateSubIndex(pm10, aqiBreakpoints.pm10) : null;

    if (pm25SubIndex === null && pm10SubIndex === null) {
      return 0;
    }

    if (pm25SubIndex === null) return Math.round(pm10SubIndex);
    if (pm10SubIndex === null) return Math.round(pm25SubIndex);

    // The final AQI is the maximum of the sub-indices
    return Math.round(Math.max(pm25SubIndex, pm10SubIndex));
  }

  const rangeMapping = {
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

  const AQI_LEVELS = [
    {
      max: 50,
      color: "#00FF00", // Green
      label: "Good",
    },
    {
      max: 100,
      color: "#FFFF00", // Yellow
      label: "Moderate",
    },
    {
      max: 150,
      color: "#FFA500", // Orange
      label: "Unhealthy for Sensitive Groups",
    },
    {
      max: 200,
      color: "#FF0000", // Red
      label: "Unhealthy",
    },
    {
      max: 300,
      color: "#800080", // Purple
      label: "Very Unhealthy",
    },
    {
      max: Infinity,
      color: "#800000", // Maroon
      label: "Hazardous",
    },
  ];

  
  function getAQIColor(aqi) {
    if (aqi == 0){
      return  {
        max: Infinity,
        color: null,
        label: "",
      };
    }
    return AQI_LEVELS.find((level) => aqi <= level.max);
  }
  
  // Function to get color for a parameter and value
  function getColorForParam(param, value) {
    try {
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
  const sampleData = [
    { timestamp: "2024-10-01T00:00:00Z", value: 10 },
    { timestamp: "2024-10-02T00:00:00Z", value: 15 },
    { timestamp: "2024-10-03T00:00:00Z", value: 20 },
    // More data points
  ];
  const [selectedVariable, setSelectedVariable] = useState("");
  return (
    <div style={{ display: "flex", marginTop: 56 }}>
      <div
        style={{ width: 200, padding: "10px", borderRight: "1px solid #ddd" }}
      >
        <input
          type="text"
          placeholder="Search devices"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            marginBottom: "10px",
            borderRadius: 6,
            border: "1px solid #d3d3d350",
            boxSizing: "border-box",
          }}
        />
        <ul style={{ listStyle: "none", padding: 0 }}>
          {devices
            .filter((device) =>
              device.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((device) => (
              <li
                key={device.id}
                onClick={() => {
                  console.log(device.id, 'DEVICE ID')  
                  setSelectedDevice(device.id)
                
                }}
                style={{
                  padding: "10px",
                  cursor: "pointer",
                  backgroundColor:
                    device.id === selectedDevice ? "#03A9E7" : "transparent",
                  color: device.id === selectedDevice ? "white" : "black",
                  borderRadius: 6,
                }}
              >
                {device.id}, {device.name}
              </li>
            ))}
        </ul>
      </div>

      <div
        style={{
          width: "calc(100vw - 450px)",
          overflow: "hidden",
          height: "calc(100vh - 56px)",
          backgroundColor: "#F5F7F9",
        }}
      >
        <div>
          <div
            style={{
              width: "100%",
              overflow: "hidden",
              height: "auto",
              padding: 10,
              backgroundColor: "#ffffff",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <div>
              {devices &&
                devices.length > 0 &&
                devices?.find((d) => d.id === selectedDevice).id}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
              }}
            >

          <DownloadAQIExcel selectedDevice={selectedDevice}/>
              <DropdownList url={url} setUrl={setUrl} selectedDevice={selectedDevice}/>
              Location-{" "}
              {devices &&
                devices.length > 0 &&
                devices?.find((d) => d.id === selectedDevice).name}
            </div>
          </div>
        </div>
        {loading ? (
          <>
            <ShimmerLoader />
          </>
        ) : (
          <>
            <div
              style={{
                width: "calc(100vw - 490px)",
                overflow: "hidden",
                height: 200,
                margin: 20,
                borderRadius: 20,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "200px",
                  paddingRight: "40px",
                  overflow: "auto",
                  height: 200,
                  padding: 10,
                  borderTopLeftRadius: 20,
                  borderBottomLeftRadius: 20,
                  background:
                    "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 75%, rgba(255,255,255,0) 100%)",
                  display: "flex",
                  flexDirection: "row",
                  // justifyContent: "space-evenly",
                }}
              >
                {/* { getAQIColor(calculateAQIPM25PM10(
                      rows.indoor_pm2_5?.length === 0
                        ? null
                        : (indoor_avg?.["pm2.5"] / 400) * 100,
                      rows.indoor_pm10_0?.length === 0
                        ? null
                        : (indoor_avg?.["pm10.0"] / 500) * 100
                    )).color} */}
                <CircularProgressbar
                  value={calculateAQIPM25PM10(
                    rows.indoor_pm2_5?.length === 0
                      ? null
                      : (indoor_avg?.["pm2.5"] / 400) * 100,
                    rows.indoor_pm10_0?.length === 0
                      ? null
                      : (indoor_avg?.["pm10.0"] / 500) * 100
                  )}
                  text={`${calculateAQIPM25PM10(
                    rows.indoor_pm2_5?.length === 0
                      ? null
                      : (indoor_avg?.["pm2.5"] / 400) * 100,
                    rows.indoor_pm10_0?.length === 0
                      ? null
                      : (indoor_avg?.["pm10.0"] / 500) * 100
                  )} µg/m³`}
                  styles={buildStyles({
                    textSize: "16px",
                    pathTransitionDuration: 0.5,
                    pathColor: getAQIColor(calculateAQIPM25PM10(
                      rows.indoor_pm2_5?.length === 0
                        ? null
                        : (indoor_avg?.["pm2.5"] / 400) * 100,
                      rows.indoor_pm10_0?.length === 0
                        ? null
                        : (indoor_avg?.["pm10.0"] / 500) * 100
                    )).color,
                    textColor: getAQIColor(calculateAQIPM25PM10(
                      rows.indoor_pm2_5?.length === 0
                        ? null
                        : (indoor_avg?.["pm2.5"] / 400) * 100,
                      rows.indoor_pm10_0?.length === 0
                        ? null
                        : (indoor_avg?.["pm10.0"] / 500) * 100
                    )).color,
                    trailColor: "#d6d6d6",
                    backgroundColor: "#3e98c7",
                  })}
                />
              </div>
              <div
                style={{
                  width: "78%",
                  overflowY: "hidden",
                  overflowX: "scroll",
                  height: 180,
                  // marginTop: 15,
                  paddingTop: 10,
                  borderRadius: 20,
                  backgroundColor: "#ffffff",
                  display: "flex",
                  flexDirection: "row",
                  // paddingLeft: 200,
                }}
              >
                <div
                  style={{
                    width: 300,
                    minWidth: 300,
                    overflow: "auto",
                    height: "100%",
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor:
                      selectedVariable === "indoor_pm2_5"
                        ? "#007bff20"
                        : "#d3d3d330",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    // justifyContent: "space-evenly",
                  }}
                  onClick={() => {
                    setSelectedVariable("indoor_pm2_5");
                  }}
                >
                  <div
                    style={{
                      marginTop: -2,
                      height: 16,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "11px",
                      color: "#545454",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Indoor</div>
                    <div>Outdoor</div>
                  </div>
                  <div
                    style={{
                      height: "75%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CircularProgressbar
                      value={
                        rows.indoor_pm2_5?.length === 0
                          ? 0
                          : (indoor_avg?.["pm2.5"] / 400) * 100
                      }
                      text={
                        rows.indoor_pm2_5?.length === 0
                          ? "N/A"
                          : parseInt(indoor_avg?.["pm2.5"]) + "μg/m3"
                      }
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        pathColor: getColorForParam(
                          "pm2.5",
                          indoor_avg?.["pm2.5"]
                        ),
                        textColor:
                          rows.indoor_pm2_5?.length === 0
                            ? "#d3d3d3"
                            : getColorForParam("pm2.5", indoor_avg?.["pm2.5"]),
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    <CircularProgressbar
                      value={0}
                      text={`N/A`}
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        textColor: "#d3d3d3",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      height: 16,
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#03A9E7" }}>PM2.5</span>&nbsp;
                    Average&nbsp;&nbsp;
                    <RxDoubleArrowDown />
                  </div>
                </div>
                <div
                  style={{
                    width: 300,
                    minWidth: 300,
                    overflow: "auto",
                    height: "100%",
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor:
                      selectedVariable === "indoor_pm10_0"
                        ? "#007bff20"
                        : "#d3d3d330",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedVariable("indoor_pm10_0");
                  }}
                >
                  <div
                    style={{
                      marginTop: -2,
                      height: 16,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "11px",
                      color: "#545454",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Indoor</div>
                    <div>Outdoor</div>
                  </div>
                  <div
                    style={{
                      height: "75%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CircularProgressbar
                      value={
                        rows.indoor_pm10_0?.length === 0
                          ? 0
                          : (indoor_avg?.["pm10.0"] / 500) * 100
                      }
                      text={
                        rows.indoor_pm10_0?.length === 0
                          ? "N/A"
                          : parseInt(indoor_avg?.["pm10.0"]) + "μg/m3"
                      }
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        pathColor: getColorForParam(
                          "pm10.0",
                          indoor_avg?.["pm10.0"]
                        ),
                        textColor:
                          rows.indoor_pm10_0?.length === 0
                            ? "#d3d3d3"
                            : getColorForParam(
                                "pm10.0",
                                indoor_avg?.["pm10.0"]
                              ),
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    <CircularProgressbar
                      value={0}
                      text={`N/A`}
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        textColor: "#d3d3d3",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      height: 16,
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#03A9E7" }}>PM10.0</span>&nbsp;
                    Average&nbsp;&nbsp;
                    <RxDoubleArrowDown />
                  </div>
                </div>
                <div
                  style={{
                    width: 300,
                    minWidth: 300,
                    overflow: "auto",
                    height: "100%",
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor:
                      selectedVariable === "indoor_temp"
                        ? "#007bff20"
                        : "#d3d3d330",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedVariable("indoor_temp");
                  }}
                >
                  <div
                    style={{
                      marginTop: -2,
                      height: 16,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "11px",
                      color: "#545454",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Indoor</div>
                    <div>Outdoor</div>
                  </div>
                  <div
                    style={{
                      height: "75%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CircularProgressbar
                      value={
                        rows.indoor_temp?.length === 0
                          ? 0
                          : (indoor_avg?.["temp"] / 400) * 100
                      }
                      text={
                        rows.indoor_temp?.length === 0
                          ? "N/A"
                          : parseInt(indoor_avg?.["temp"]) + "°C"
                      }
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        pathColor: getColorForParam(
                          "temp",
                          indoor_avg?.["temp"]
                        ),
                        textColor:
                          rows.indoor_temp?.length === 0
                            ? "#d3d3d3"
                            : getColorForParam("temp", indoor_avg?.["temp"]),
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    <CircularProgressbar
                      value={0}
                      text={`N/A`}
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        textColor: "#d3d3d3",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      height: 16,
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#03A9E7" }}>Temperature</span>&nbsp;
                    Average&nbsp;&nbsp;
                    <RxDoubleArrowDown />
                  </div>
                </div>
                <div
                  style={{
                    width: 300,
                    minWidth: 300,
                    overflow: "auto",
                    height: "100%",
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor:
                      selectedVariable === "indoor_humidity"
                        ? "#007bff20"
                        : "#d3d3d330",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedVariable("indoor_humidity");
                  }}
                >
                  <div
                    style={{
                      marginTop: -2,
                      height: 16,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "11px",
                      color: "#545454",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Indoor</div>
                    <div>Outdoor</div>
                  </div>
                  <div
                    style={{
                      height: "75%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CircularProgressbar
                      value={
                        rows.indoor_humidity?.length === 0
                          ? 0
                          : (indoor_avg?.["humidity"] / 100) * 100
                      }
                      text={
                        rows.indoor_humidity?.length === 0
                          ? "N/A"
                          : parseInt(indoor_avg?.["humidity"]) + "%"
                      }
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        pathColor: getColorForParam(
                          "humidity",
                          indoor_avg?.["humidity"]
                        ),
                        textColor:
                          rows.indoor_humidity?.length === 0
                            ? "#d3d3d3"
                            : getColorForParam(
                                "humidity",
                                indoor_avg?.["humidity"]
                              ),
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    <CircularProgressbar
                      value={0}
                      text={`N/A`}
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        textColor: "#d3d3d3",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      height: 16,
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#03A9E7" }}>Humidity</span>&nbsp;
                    Average&nbsp;&nbsp;
                    <RxDoubleArrowDown />
                  </div>
                </div>
                <div
                  style={{
                    width: 300,
                    minWidth: 300,
                    overflow: "auto",
                    height: "100%",
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor:
                      selectedVariable === "indoor_co2"
                        ? "#007bff20"
                        : "#d3d3d330",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedVariable("indoor_co2");
                  }}
                >
                  <div
                    style={{
                      marginTop: -2,
                      height: 16,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "11px",
                      color: "#545454",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Indoor</div>
                    <div>Outdoor</div>
                  </div>
                  <div
                    style={{
                      height: "75%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CircularProgressbar
                      value={
                        rows.indoor_co2?.length === 0
                          ? 0
                          : (indoor_avg?.["co2"] / 2500) * 100
                      }
                      text={
                        rows.indoor_co2?.length === 0
                          ? "N/A"
                          : parseInt(indoor_avg?.["co2"])
                      }
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        pathColor: getColorForParam("co2", indoor_avg?.["co2"]),
                        textColor:
                          rows.indoor_co2?.length === 0
                            ? "#d3d3d3"
                            : getColorForParam("co2", indoor_avg?.["co2"]),
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    <CircularProgressbar
                      value={0}
                      text={`N/A`}
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        textColor: "#d3d3d3",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      height: 16,
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#03A9E7" }}>CO2</span>&nbsp;
                    Average&nbsp;&nbsp;
                    <RxDoubleArrowDown />
                  </div>
                </div>
                <div
                  style={{
                    width: 300,
                    minWidth: 300,
                    overflow: "auto",
                    height: "100%",
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor:
                      selectedVariable === "indoor_tvoc"
                        ? "#007bff20"
                        : "#d3d3d330",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedVariable("indoor_tvoc");
                  }}
                >
                  <div
                    style={{
                      marginTop: -2,
                      height: 16,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "11px",
                      color: "#545454",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Indoor</div>
                    <div>Outdoor</div>
                  </div>
                  <div
                    style={{
                      height: "75%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CircularProgressbar
                      value={
                        rows.indoor_tvoc?.length === 0
                          ? 0
                          : (indoor_avg?.["tvoc"] / 5500) * 100
                      }
                      text={
                        rows.indoor_tvoc?.length === 0
                          ? "N/A"
                          : parseInt(indoor_avg?.["tvoc"]) + "ppb"
                      }
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        pathColor: getColorForParam(
                          "tvoc",
                          indoor_avg?.["tvoc"]
                        ),
                        textColor:
                          rows.indoor_tvoc?.length === 0
                            ? "#d3d3d3"
                            : getColorForParam("tvoc", indoor_avg?.["tvoc"]),
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    <CircularProgressbar
                      value={0}
                      text={`N/A`}
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        textColor: "#d3d3d3",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      height: 16,
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#03A9E7" }}>TVOC</span>&nbsp;
                    Average&nbsp;&nbsp;
                    <RxDoubleArrowDown />
                  </div>
                </div>
                <div
                  style={{
                    width: 300,
                    minWidth: 300,
                    overflow: "auto",
                    height: "100%",
                    padding: 10,
                    marginRight: 10,
                    borderRadius: 20,
                    backgroundColor:
                      selectedVariable === "indoor_hcho"
                        ? "#007bff20"
                        : "#d3d3d330",
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setSelectedVariable("indoor_hcho");
                  }}
                >
                  <div
                    style={{
                      marginTop: -2,
                      height: 16,
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                      fontSize: "11px",
                      color: "#545454",
                      justifyContent: "space-around",
                    }}
                  >
                    <div>Indoor</div>
                    <div>Outdoor</div>
                  </div>
                  <div
                    style={{
                      height: "75%",
                      width: "100%",
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <CircularProgressbar
                      value={
                        rows.indoor_hcho?.length === 0
                          ? 0
                          : (indoor_avg?.["hcho"] / 1) * 100
                      }
                      text={
                        rows.indoor_hcho?.length === 0
                          ? "N/A"
                          : parseInt(indoor_avg?.["hcho"]) + "mg/m3"
                      }
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        pathColor: getColorForParam(
                          "hcho",
                          indoor_avg?.["hcho"]
                        ),
                        textColor:
                          rows.indoor_hcho?.length === 0
                            ? "#d3d3d3"
                            : getColorForParam("hcho", indoor_avg?.["hcho"]),
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                    <CircularProgressbar
                      value={0}
                      text={`N/A`}
                      styles={buildStyles({
                        textSize: "20px",
                        pathTransitionDuration: 0.5,
                        textColor: "#d3d3d3",
                        trailColor: "#d6d6d6",
                        backgroundColor: "#3e98c7",
                      })}
                    />
                  </div>
                  <div
                    style={{
                      height: 16,
                      width: "100%",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      cursor: "pointer",
                    }}
                  >
                    <span style={{ color: "#03A9E7" }}>HCHO</span>&nbsp;
                    Average&nbsp;&nbsp;
                    <RxDoubleArrowDown />
                  </div>
                </div>
              </div>
            </div>

            <div
              style={{
                width: "auto",
                overflow: "hidden",
                height: "65%",
                // padding: 10,
                margin: 20,
                borderRadius: 20,
                backgroundColor: "#ffffff",
                display: "flex",
                flexDirection: "row",
                justifyContent: selectedVariable ? "left" : "center",
                alignItems: selectedVariable ? "flex-start" : "center",
                color: "#d3d3d3",
              }}
            >
              {selectedVariable ? (
                <div
                  style={{
                    width: "100%",
                    height: 350,
                    overflow: 'scroll-y'
                  }}
                >
                  {/* {selectedVariable} */}
                  <TimeSeriesChart data={rows?.[selectedVariable]} />
                </div>
              ) : (
                <>Nothing selected</>
              )}
            </div>
          </>
        )}
        {/* <>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
              gap: 100,
            }}
          >
            <Gauge
              value={(
                data.reduce((acc, d) => acc + d.pm25, 0) / data.length
              ).toFixed(2)}
              min={0}
              max={500}
              label="Average PM2.5"
            />
            <Gauge
              value={(
                data.reduce((acc, d) => acc + d.pm25, 0) / data.length
              ).toFixed(2)}
              min={0}
              max={500}
              label="Average PM10.0"
            />
          </div>
          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Indoor Humidity
          </div>
          <TimeSeriesChart data={rows?.indoor_humidity} />

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Indoor Temperature
          </div>
          <TimeSeriesChart data={rows?.indoor_temp} />

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Indoor PM2.5
          </div>
          <TimeSeriesChart data={rows?.indoor_pm2_5} />

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Indoor PM10
          </div>
          <TimeSeriesChart data={rows?.indoor_pm10_0} />

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Indoor CO2
          </div>
          <TimeSeriesChart data={rows?.indoor_co2} />

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Indoor TVOC
          </div>
          <TimeSeriesChart data={rows?.indoor_tvoc} />

          <div
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              justifyItems: "center",
              textAlign: "center",
              fontWeight: "800",
            }}
          >
            Indoor HCHO
          </div>
          <TimeSeriesChart data={rows?.indoor_hcho} />
        </> */}
        {/* {!Object.values(rows).every(
          (arr) => Array.isArray(arr) && arr.length === 0
        ) ? (
          <>
            <NoDataMessage />
          </>
        ) : (
          
        )} */}

        {/* {renderAreaGraph("pm25", "PM2.5")}
        {renderAreaGraph("pm10", "PM10")}
        {renderAreaGraph("temp", "Temperature")}
        {renderAreaGraph("co2", "CO2")}
        {renderAreaGraph("tvoc", "TVOC")}
        {renderAreaGraph("hcho", "HCHO")} */}
      </div>
    </div>
  );
};

export default AQIPage;
