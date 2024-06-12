// SectorCharts.js
import React, { useState, useEffect } from "react";
import CO2Chart from "../components/Charts/CO2Chart";
import CH4Chart from "../components/Charts/CH4Chart";
import N2OChart from "../components/Charts/N2OChart";
import "../styles/chart.css";

const SectorCharts = ({ sector }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

  const fetchData = async (sector) => {
    try {
      const response = await fetch(`http://localhost:4000/?sector=${sector}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setData(data);
      console.log(data);
      setTitle(`${sector} Emissions Over Years`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleButtonClick = (sector) => {
    console.log(sector);
    fetchData(sector);
  };

  useEffect(() => {
    // Fetch initial data if needed
    fetchData("Agriculture");
  }, []);

  return (
    <div>
      <div className="buttons-container">
        <button
          className="but"
          onClick={() => handleButtonClick("Agriculture")}
        >
          Agriculture
        </button>
        <button
          className="but"
          onClick={() => handleButtonClick("Manufacturing")}
        >
          Manufacturing
        </button>
        <button
          className="but"
          onClick={() => handleButtonClick("Construction")}
        >
          Construction
        </button>
        <button className="but" onClick={() => handleButtonClick("Transport")}>
          Transport
        </button>
        <button className="but" onClick={() => handleButtonClick("Mining")}>
          Mining
        </button>
      </div>
      <div>
        <h2 className="title">{title}</h2>
        {data.length > 0 ? (
          <>
            <div className="chart-container">
              <CO2Chart data={data} title="CO2 Emissions" />
            </div>
            <div className="chart-container1">
              <CH4Chart data={data} title="CH4 Emissions" />
            </div>
            <div className="chart-container2">
              <N2OChart data={data} title="N2O Emissions" />
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default SectorCharts;
