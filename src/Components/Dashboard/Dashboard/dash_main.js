import React, { useEffect, useState } from "react";
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
} from "chart.js";
import axios from "axios";
import { getBaseURL } from "../../../common/constant/urls";

// Register Chart.js components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement
);
const DashMain = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Fetch data from the unified API
    axios
      .get(getBaseURL() + "/dashboard-data")
      .then((response) => setDashboardData(response.data))
      .catch((err) => console.error("Error fetching dashboard data:", err));
  }, []);

  if (!dashboardData) {
    return <p>Loading...</p>;
  }

  // Extract data from API response
  const {
    devicesOnboarded,
    devicesByCustomers,
    devicesByLocations,
    customersOnboarded,
    activities,
  } = dashboardData;

  // Helper to convert month index to month name
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const getMonthName = (monthIndex) => monthNames[monthIndex - 1]; // Adjusting for 0-based array

  // Helper to group data by day
  const groupByDay = (data) => {
    const dayGroups = {};
    data.forEach((item) => {
      const day = new Date(item.createdAt).toLocaleDateString(); // Format as 'MM/DD/YYYY'
      if (!dayGroups[day]) dayGroups[day] = 0;
      dayGroups[day]++;
    });
    return dayGroups;
  };

  // Activities data grouped by day
  const devicesActivitiesByDay = groupByDay(activities.devices);
  const customersActivitiesByDay = groupByDay(activities.customers);
  const subscriptionsActivitiesByDay = groupByDay(activities.subscriptions);
  const dashboardsActivitiesByDay = groupByDay(activities.dashboards);

  // Line Chart Data for Daily Activities
  const activitiesLineChartData = {
    labels: Object.keys(devicesActivitiesByDay), // Days as labels
    datasets: [
      {
        label: "Devices",
        data: Object.values(devicesActivitiesByDay),
        borderColor: "rgba(54, 162, 235, 1)",
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        tension: 0.4,
      },
      {
        label: "Customers",
        data: Object.values(customersActivitiesByDay),
        borderColor: "rgba(255, 99, 132, 1)",
        backgroundColor: "rgba(255, 99, 132, 0.4)",
        tension: 0.4,
      },
      {
        label: "Subscriptions",
        data: Object.values(subscriptionsActivitiesByDay),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.4)",
        tension: 0.4,
      },
      {
        label: "Dashboards",
        data: Object.values(dashboardsActivitiesByDay),
        borderColor: "rgba(153, 102, 255, 1)",
        backgroundColor: "rgba(153, 102, 255, 0.4)",
        tension: 0.4,
      },
    ],
  };

  // Chart Data for the first row
  const devicesOnboardedData = {
    labels: devicesOnboarded.map((item) => getMonthName(item._id)),
    datasets: [
      {
        label: "Devices Onboarded",
        data: devicesOnboarded.map((item) => item.count),
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const devicesByCustomersData = {
    labels: devicesByCustomers.map((item) => item.customerId || "Unknown"),
    datasets: [
      {
        label: "Devices per Customer",
        data: devicesByCustomers.map((item) => item.count),
        backgroundColor: "rgba(153, 102, 255, 0.6)",
      },
    ],
  };

  const devicesByLocationsData = {
    labels: devicesByLocations.map((item) => item._id),
    datasets: [
      {
        label: "Devices by Location",
        data: devicesByLocations.map((item) => item.count),
        backgroundColor: "rgba(255, 206, 86, 0.6)",
      },
    ],
  };

  const customersOnboardedData = {
    labels: customersOnboarded.map((item) => getMonthName(item._id)),
    datasets: [
      {
        label: "Customers Onboarded",
        data: customersOnboarded.map((item) => item.count),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };

  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
  };

  return (
    <div
      style={{
        padding: "20px",
        marginTop: "50px",
        backgroundColor: "#F5F7F9",
        height: "100vh",
        overflow: "scroll",
        width: "calc(100vw - 250px)",
      }}
    >
      {/* 4 small charts */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        {/* Devices Onboarded */}
        <div
          style={{
            flex: 1,
            margin: "0 8px",
            height: "250px",
            backgroundColor: "#fff",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "30px",
            borderRadius: 10,
            width: "250px",
          }}
        >
          <Bar data={devicesOnboardedData} options={chartOptions} />
          <p
            style={{ textAlign: "center", fontSize: "12px", marginTop: "5px" }}
          >
            Devices Onboarded Monthly
          </p>
        </div>

        {/* Devices by Customers */}
        <div
          style={{
            flex: 1,
            margin: "0 8px",
            height: "250px",
            backgroundColor: "#fff",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "30px",
            borderRadius: 10,
            width: "250px",
          }}
        >
          <Pie data={devicesByCustomersData} options={chartOptions} />
          <p
            style={{ textAlign: "center", fontSize: "12px", marginTop: "5px" }}
          >
            Devices by Customers
          </p>
        </div>

        {/* Devices by Locations */}
        <div
          style={{
            flex: 1,
            margin: "0 8px",
            height: "250px",
            backgroundColor: "#fff",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "30px",
            borderRadius: 10,
            width: "250px",
          }}
        >
          <Doughnut data={devicesByLocationsData} options={chartOptions} />
          <p
            style={{ textAlign: "center", fontSize: "12px", marginTop: "5px" }}
          >
            Devices by Locations
          </p>
        </div>

        {/* Customers Onboarded */}
        <div
          style={{
            flex: 1,
            margin: "0 8px",
            height: "250px",
            backgroundColor: "#fff",
            paddingTop: "10px",
            paddingLeft: "10px",
            paddingRight: "10px",
            paddingBottom: "30px",
            borderRadius: 10,
            width: "250px",
          }}
        >
          <Bar data={customersOnboardedData} options={chartOptions} />
          <p
            style={{ textAlign: "center", fontSize: "12px", marginTop: "5px" }}
          >
            Customers Onboarded Monthly
          </p>
        </div>
      </div>

      {/* Big chart - Activities Trends */}
      <div
        style={{
          height: "400px",
          backgroundColor: "#fff",
          padding: "10px",
          borderRadius: 10,
        }}
      >
        <Line data={activitiesLineChartData} options={chartOptions} />
        <p style={{ textAlign: "center", marginTop: "10px", fontSize: "14px" }}>
          Daily Activities Trends
        </p>
      </div>
    </div>
  );
};

export default DashMain;
