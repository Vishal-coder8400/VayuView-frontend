import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto'; // Chart.js v3 requires this import

const BarGraph = ({ data }) => {
  const chartData = {
    labels: data.map(item => item.label),
    datasets: [
      {
        label: 'Monthly Deliveries',
        data: data.map(item => item.value),
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
        tension: 0.4 
      }
    ]
  };

  const options = {
    scales: {
      x: {
        grid: {
          display: false, 
        },
        barPercentage: 0.5, // Controls the width of the bars
        categoryPercentage: 0.5,
      },
      y: {
        grid: {
          display: false, 
        },
        beginAtZero: true,
        max: 20,
        lineWidth: 0.5,
      }
    },
    maintainAspectRatio: true,
    aspectRatio: 1, 
  };

  return (
    <div className="bar-graph-container" style={{ height: '400px', width: '100%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default BarGraph;
