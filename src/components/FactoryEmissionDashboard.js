import React, { useState } from "react";
import "../styles/factoryDashboard.css";

const FactoryEmissionDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly"); // Initial reporting period
  const [selectedEmissionType, setSelectedEmissionType] = useState(null); // Currently selected emission type
  const [emissionData, setEmissionData] = useState({}); // Stores entered data for current period


  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const handleEmissionTypeSelect = (emissionType) => {
    setSelectedEmissionType(emissionType);
  };

  const handleDataEntry = (e) => {
    e.preventDefault();
    // Implement logic to update emissionData state based on form input
    console.log("Entered data for", selectedEmissionType, emissionData);
    // Clear form or reset values after successful submission (optional)
  };
  return (
    <div className="factory-dashboard">
      {/* Top Section */}
      <div className="top-section">
        <h2>Factory Name</h2>
        <select value={selectedPeriod} onChange={handlePeriodChange}>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
        </select>
        <div className="quick-links"></div>
      </div>

      {/* Main Content Area */}
      <div className="main-content">
        <div className="emission-sources">
          <ul>
            <li onClick={() => handleEmissionTypeSelect("CO2")}>CO2</li>
            {/* <li onClick={() => handleEmissionTypeSelect("NO2")}>NO2</li>
            <li onClick={() => handleEmissionTypeSelect("SO4")}>SO4</li> */}
            {/* Add more emission types as needed */}
          </ul>
        </div>
        <div className="data-entry-form">
          {selectedEmissionType && (
            <form onSubmit={handleDataEntry}>
              {/* Dynamically render form fields based on selectedEmissionType */}
              <label htmlFor="emissionValue">Carbon Emission (tons):</label>
              <input type="number" id="emissionValue" required />
              {/* <label htmlFor="measurementMethod">Measurement Method:</label>
              <input type="text" id="measurementMethod" required /> */}
              <button type="submit">Save</button>
            </form>
          )}
        </div>
      </div>

      {/* ... (implement data preview panel with state management) ... */}
    </div>
  );
};

export default FactoryEmissionDashboard;
