import React, { useState } from "react";
import Chart from "react-apexcharts";

const TimeSeriesChart = ({ data }) => {
  const [selectedRange, setSelectedRange] = useState("daily");

  // Function to group data into 5-minute intervals
  const formatData = (data) => {
    try{
      
    const fiveMinutes = 5 * 60 * 1000; // 5 minutes in milliseconds
    const formattedData = [];

    // Sort data by timestamp
    data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    let currentTime = new Date(data[0].timestamp).getTime(); // Start time

    for (let i = 0; i < data.length; i++) {
      const point = data[i];
      const pointTime = new Date(point.timestamp).getTime();

      // Fill missing intervals with null values
      while (currentTime < pointTime) {
        formattedData.push({ x: new Date(currentTime), y: null });
        currentTime += fiveMinutes;
      }

      // Add actual data point
      formattedData.push({
        x: new Date(point.timestamp),
        y: point.value,
      });

      // Move to the next 5-minute interval
      currentTime += fiveMinutes;
    }

    return formattedData;

  }catch(err){
    console.log(err, 'ERRORTIMESTAMP')
    return []
  }
  };

  // Calculate Min, Max, Avg
  const calculateMetrics = (data) => {
    const values = data.map((d) => d.value).filter((v) => v !== null);
    if (values.length === 0) return { min: 0, max: 0, avg: 0 };

    const min = Math.min(...values);
    const max = Math.max(...values);
    const avg = values.reduce((acc, val) => acc + val, 0) / values.length;

    return { min, max, avg };
  };

  const formattedData = formatData(data);
  const metrics = calculateMetrics(data);

  const series = [
    {
      name: "Data",
      data: formattedData,
    },
  ];

  const options = {
    chart: {
      type: "area",
      zoom: { enabled: true },
    },
    stroke: {
      curve: "smooth",
      connectNullData: false, // Keeps gaps visible
    },
    xaxis: {
      type: "datetime",
      title: { text: "Timestamp" },
      labels: {
        format: "HH:mm",
        datetimeUTC: false,
        showDuplicates: false,
      },
      tickAmount: 6, // Ensures proper spacing
    },
    yaxis: {
      title: { text: "Value" },
    },
    tooltip: { x: { format: "dd MMM yyyy HH:mm" } },
    annotations: {
      yaxis: [
        {
          y: metrics.min,
          borderColor: "#00E396",
          label: {
            borderColor: "#00E396",
            style: { color: "#fff", background: "#00E396" },
            text: `Min: ${metrics.min}`,
          },
        },
        {
          y: metrics.max,
          borderColor: "#FEB019",
          label: {
            borderColor: "#FEB019",
            style: { color: "#fff", background: "#FEB019" },
            text: `Max: ${metrics.max}`,
          },
        },
        {
          y: metrics.avg,
          borderColor: "#775DD0",
          label: {
            borderColor: "#775DD0",
            style: { color: "#fff", background: "#775DD0" },
            text: `Avg: ${metrics.avg.toFixed(2)}`,
          },
        },
      ],
    },
  };

  return (
    <div>
      <Chart options={options} series={series} type="area" height={350} />
    </div>
  );
};

export default TimeSeriesChart;
