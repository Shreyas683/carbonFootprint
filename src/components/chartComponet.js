import React, { useState, useEffect } from "react";
import {
  Chart,
  LineController,
  LineElement,
  LinearScale,
  PointElement,
  TimeScale,
} from "chart.js";

import "chartjs-adapter-date-fns"; // Import date-fns adapter for Chart.js
import "../styles/chart.css"; // Import CSS for chart styling

Chart.register(LineController, LineElement, LinearScale, PointElement, TimeScale);

const ChartComponent = () => {
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);
  const [chartLabel, setChartLabel] = useState("Manufacturing");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:4000/CO2.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        // Extract selected data from the JSON based on the chartLabel state
        const selectedData = data.map((item) => ({
          year: item.Years,
          value: parseFloat(item[chartLabel].replace(/,/g, "")), // Convert string to number
        }));
        setChartData(selectedData);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [chartLabel]);

  useEffect(() => {
    if (chartData.length > 0) {
      renderChart();
    }
  }, [chartData]);

  const handleButtonClick = (label) => {
    setChartLabel(label);
  };

  const renderChart = () => {
    const ctx = document.getElementById("co2Chart");
    if (ctx) {
      // Destroy the existing Chart instance if it exists
      const existingChart = Chart.getChart(ctx);
      if (existingChart) {
        existingChart.destroy();
      }
    }

    // Create a new Chart instance
    new Chart(ctx, {
      type: "line",
      data: {
        labels: chartData.map((data) => data.year),
        datasets: [
          {
            label: chartLabel,
            data: chartData.map((data) => data.value),
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            type: "time",
            time: {
              unit: "year",
            },
            title: {
              display: true,
              text: "Years",
            },
          },
          y: {
            title: {
              display: true,
              text: "CO2 Emissions",
            },
          },
        },
      },
    });
  };

  if (error) {
    return <div className="error">Error fetching data: {error.message}</div>;
  }

  return (
    <>
    <div className="buttons-container">
        <button className="btn1" onClick={() => handleButtonClick("Agriculture, forestry and fishing")}>Agriculture</button>
        <button onClick={() => handleButtonClick("Manufacturing")}>Manufacturing</button>
        <button onClick={() => handleButtonClick("Construction")}>Construction</button>
        <button onClick={() => handleButtonClick("Transport and storage")}>Transport</button>
        <button onClick={() => handleButtonClick("Mining and quarrying")}>Mining</button>
      </div>
    <div className="chart-container">
      
      <h2>{chartLabel} CO2 Emissions</h2>
      <canvas id="co2Chart"></canvas>
    </div>
    </>
  );
};

export default ChartComponent;
