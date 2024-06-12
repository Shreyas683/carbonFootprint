// CO2Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import "../../styles/gases.css"

const CO2Chart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.Year),
    datasets: [
      {
        label: 'CO2',
        data: data.map(item => parseFloat(item.CO2.replace(/,/g, ''))),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
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

export default CO2Chart;
