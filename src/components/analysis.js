import React from "react";
import { Link } from "react-router-dom";
import "../styles/analysis.css";
import gifPath from "../assets/table.gif"; // Update this path if the GIF is stored locally
import chart from "../assets/line-chart.gif"; // Update this path if the GIF is stored locally

const Analysis = () => {
  return (
    <div className="analysis">
      <div className="heading">
        <div className="table">Table</div>
        <div className="chart">Chart</div>
      </div>
      <div className="analysis-links">
        <Link to="/table" className="table">
          <img src={gifPath} alt="Table Analysis GIF" />
        </Link>
        <Link to="/sector-charts" className="chart">
          <img src={chart} alt="Chart Analysis GIF" />
        </Link>
      </div>
    </div>
  );
};

export default Analysis;
