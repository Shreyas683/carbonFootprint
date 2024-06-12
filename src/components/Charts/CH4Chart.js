// CH4Chart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import "../../styles/gases.css"

const CH4Chart = ({ data, title }) => {
  const chartData = {
    labels: data.map(item => item.Year),
    datasets: [
      {
        label: 'CH4',
        data: data.map(item => parseFloat(item.CH4.replace(/,/g, ''))),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
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

export default CH4Chart;
