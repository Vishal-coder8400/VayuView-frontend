import React, { useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import { getBaseURL } from "../../../common/constant/urls";
import Error from "../../../utils/Error";

const DownloadAQIExcel = ({selectedDevice}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${getBaseURL()}/aqi-logs-excel/get/excel?mid=${selectedDevice}&start=${startDate}&end=${endDate}`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });

      saveAs(blob, `aqi_logs_${startDate}_to_${endDate}.xlsx`);
      setShowPopup(false);
    } catch (error) {
      Error("Error Downloading File!")
      console.error("Error downloading file:", error);
    }
    setLoading(false);
  };

  return (
    <>
      <button
        style={{
          border: "1px solid #d3d3d380",
          borderRadius: 6,
          padding: "6px 12px",
        }}
        onClick={() => setShowPopup(true)}
      >
        Download AQI Data
      </button>

      {showPopup && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(255, 255, 255, 0.8)", // White transparent overlay
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "8px",
              boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
              textAlign: "center",
              minWidth: "300px",
            }}
          >
            <h3>Select Date Range</h3>
            <label>Start Date:</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              style={{ display: "block", margin: "8px auto", padding: "4px" }}
            />
            <label>End Date:</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              style={{ display: "block", margin: "8px auto", padding: "4px" }}
            />
            <br />
            <button
              onClick={handleDownload}
              style={{
                margin: "10px",
                padding: "6px 12px",
                background: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              {loading ? "Downloading..." : "Download"}
            </button>
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginRight: "10px",
                padding: "6px 10px",
                background: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default DownloadAQIExcel;
