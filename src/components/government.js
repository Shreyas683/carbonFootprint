import React, { useState, useEffect } from "react";

const RegulatorsDashboard = () => {
  const [factories, setFactories] = useState([]); // Stores list of factories
  const [selectedFactory, setSelectedFactory] = useState(null); // Currently selected factory
  const [factoryData, setFactoryData] = useState(null); // Stores emission data for selected factory

  // Fetch factory list on component mount
  useEffect(() => {
    const fetchFactories = async () => {
      // Implement logic to fetch list of factories from your backend (API call) blockchain
      const response = await fetch("/api/factories"); // Replace with your API endpoint
      const data = await response.json();
      setFactories(data);
    };
    fetchFactories();
  }, []);

  // Fetch factory data on selected factory change
  useEffect(() => {
    if (selectedFactory) {
      const fetchFactoryData = async () => {
        // Implement logic to fetch specific factory data based on selectedFactory ID
        const response = await fetch(`/api/factories/${selectedFactory.id}/data`);
        const data = await response.json();
        setFactoryData(data);
      };
      fetchFactoryData();
    } else {
      setFactoryData(null); // Clear factory data when selection is cleared
    }
  }, [selectedFactory]);

  const handleFactorySelect = (factory) => {
    setSelectedFactory(factory);
  };

  return (
    <div className="regulators-dashboard">
      {/* Top Section (Optional) */}
      {/* ... (display overall statistics or filters) ... */}

      {/* Factory List */}
      <div className="factory-list">
        <h2>Factories</h2>
        <ul>
          {factories.map((factory) => (
            <li key={factory.id} onClick={() => handleFactorySelect(factory)}>
              {factory.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Factory Data (Conditional) */}
      {factoryData && (
        <div className="factory-data">
          <h2>{selectedFactory.name} - Emission Data</h2>
          {/* ... (display charts, tables, or other visualizations for factory data) ... */}
        </div>
      )}
    </div>
  );
};

export default RegulatorsDashboard;
