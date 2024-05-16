
import '../styles/analysis.css'; // Ensure you create this CSS file

import React, { useState } from 'react';

const Analysis = () => {
  const [selectedFactory, setSelectedFactory] = useState('');

  const handleSelectChange = (event) => {
    setSelectedFactory(event.target.value);
  };

  const handleViewClick = () => {
    if (selectedFactory) {
      // Perform the action when the "View" button is clicked
      alert(`Selected factory: ${selectedFactory}`);
    } else {
      alert('Please select a factory first');
    }
  };

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Analysis</h1>
      <form className="analysis-form">
        <label htmlFor="factory-select" className="factory-label">Select Factory:</label>
        <select
          id="factory-select"
          className="factory-select"
          value={selectedFactory}
          onChange={handleSelectChange}
        >
          <option value="" disabled>Select a factory</option>
          <option value="factory1">Factory 1</option>
          <option value="factory2">Factory 2</option>
          <option value="factory3">Factory 3</option>
          <option value="factory4">Factory 4</option>
          <option value="factory5">Factory 5</option>
        </select>
        <button
          type="button"
          className="view-button"
          onClick={handleViewClick}
        >
          View
        </button>
      </form>
    </div>
  );
}

export default Analysis;
