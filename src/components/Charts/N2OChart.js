// N2OChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import "../../styles/gases.css"

const N2OChart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.Year),
    datasets: [
      {
        label: 'N2O',
        data: data.map(item => parseFloat(item.N2O.replace(/,/g, ''))),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default N2OChart;
