import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, CircularProgress, Typography } from '@mui/material';
import axios from 'axios';

const AQI = () => {
  const [aqiData, setAqiData] = useState([{
    "_id": {
      "$oid": "66ff9808fc4b428997d345c3"
    },
    "mid": "1234",
    "indoor_air_quality": [
      {
        "param": "humidity",
        "label": "Humidity",
        "value": 68.2,
        "unit": "%"
      },
      {
        "param": "temp",
        "label": "Temperature",
        "value": 51.1,
        "unit": "°C"
      },
      {
        "param": "pm2.5",
        "label": "PM 2.5",
        "value": 195.2,
        "unit": "μg/m3"
      },
      {
        "param": "co2",
        "label": "Co2",
        "value": 1152.7,
        "unit": "ppm"
      },
      {
        "param": "tvoc",
        "label": "TVOC",
        "value": 0.1,
        "unit": "ppb"
      },
      {
        "param": "hcho",
        "label": "HCHO",
        "value": 0,
        "unit": "mg/m3"
      }
    ],
    "outdoor_air_quality": [
      {
        "param": "humidity",
        "label": "Humidity",
        "value": 68.2,
        "unit": "%"
      },
      {
        "param": "temp",
        "label": "Temperature",
        "value": 51.1,
        "unit": "°C"
      },
      {
        "param": "pm2.5",
        "label": "PM 2.5",
        "value": 195.2,
        "unit": "μg/m3"
      },
      {
        "param": "co2",
        "label": "Co2",
        "value": 1152.7,
        "unit": "ppm"
      },
      {
        "param": "tvoc",
        "label": "TVOC",
        "value": 0.1,
        "unit": "ppb"
      },
      {
        "param": "hcho",
        "label": "HCHO",
        "value": 0,
        "unit": "mg/m3"
      }
    ],
    "timestamp": {
      "$date": "2024-10-04T07:23:52.724Z"
    }
  }]);
  const [loading, setLoading] = useState(true);

  // Fetch AQI data from the backend API
  useEffect(() => {
    const fetchAQIData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/aqi-logs'); // Adjust the endpoint accordingly
        setAqiData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching AQI data:', error);
        setLoading(false);
      }
    };
    fetchAQIData();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  // Define columns for the DataGrid
  const columns = [
    { field: 'mid', headerName: 'Device ID', width: 150 },
    { field: 'timestamp', headerName: 'Timestamp', width: 200 },
    { field: 'indoor_humidity', headerName: 'Indoor Humidity (%)', width: 150 },
    { field: 'outdoor_humidity', headerName: 'Outdoor Humidity (%)', width: 150 },
    { field: 'indoor_temp', headerName: 'Indoor Temp (°C)', width: 150 },
    { field: 'outdoor_temp', headerName: 'Outdoor Temp (°C)', width: 150 },
    { field: 'indoor_pm25', headerName: 'Indoor PM 2.5 (μg/m3)', width: 150 },
    { field: 'outdoor_pm25', headerName: 'Outdoor PM 2.5 (μg/m3)', width: 150 },
    { field: 'indoor_co2', headerName: 'Indoor CO2 (ppm)', width: 150 },
    { field: 'outdoor_co2', headerName: 'Outdoor CO2 (ppm)', width: 150 },
    { field: 'indoor_tvoc', headerName: 'Indoor TVOC (ppb)', width: 150 },
    { field: 'outdoor_tvoc', headerName: 'Outdoor TVOC (ppb)', width: 150 },
    { field: 'indoor_hcho', headerName: 'Indoor HCHO (mg/m3)', width: 150 },
    { field: 'outdoor_hcho', headerName: 'Outdoor HCHO (mg/m3)', width: 150 }
  ];

  // Prepare the rows for the DataGrid
  const rows = aqiData.map((entity, idx) => {
    // Find the corresponding indoor and outdoor parameters
    const indoorParams = {};
    const outdoorParams = {};

    entity.indoor_air_quality.forEach((param) => {
      indoorParams[param.param] = param.value;
    });
    
    entity.outdoor_air_quality.forEach((param) => {
      outdoorParams[param.param] = param.value;
    });

    return {
      id: entity._id,
      mid: entity.mid,
      timestamp: new Date(entity.timestamp).toLocaleString(),
      indoor_humidity: indoorParams.humidity || 'N/A',
      outdoor_humidity: outdoorParams.humidity || 'N/A',
      indoor_temp: indoorParams.temp || 'N/A',
      outdoor_temp: outdoorParams.temp || 'N/A',
      indoor_pm25: indoorParams['pm2.5'] || 'N/A',
      outdoor_pm25: outdoorParams['pm2.5'] || 'N/A',
      indoor_co2: indoorParams.co2 || 'N/A',
      outdoor_co2: outdoorParams.co2 || 'N/A',
      indoor_tvoc: indoorParams.tvoc || 'N/A',
      outdoor_tvoc: outdoorParams.tvoc || 'N/A',
      indoor_hcho: indoorParams.hcho || 'N/A',
      outdoor_hcho: outdoorParams.hcho || 'N/A'
    };
  });

  return (
    <Box sx={{ height: '100vh', width: '100%', padding: '20px', marginTop: 6, backgroundColor: '#F5F7FE' }}>
      <Typography variant="h5" >
        Air Quality Logs
      </Typography>
      <Box sx={{ height: '84vh', width: '80vw', borderRadius: '20px', padding: '10px', marginTop: 1, backgroundColor: '#ffffff' }}>

      {aqiData.length === 0 ? (
        <Typography variant="body1">No data available</Typography>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[5, 10, 20]}
          disableSelectionOnClick
          sx={{
            padding: 0,
            margin: 0,
            overflowX: "scroll",
            height: "calc(100vh - 140px)",
            boxShadow: 0,
            border: 0,
            borderColor: "primary.light",
            "& .MuiDataGrid-cell:hover": {},
            "& .MuiDataGrid-row:hover": {
              backgroundColor: "primary.main",
              // color: "white",
              // fill: "white",
              // accentColor: "white",
            },
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "& .MuiDataGrid-columnHeader": {
              backgroundColor: "rgba(224, 231, 255, 0.25)",
              fontWeight: "bold",
            },
            "& .MuiDataGrid-row": {
              height: "60px",
            },
          }}
        />
      )}
      </Box>
    </Box>
  );
};

export default AQI;
