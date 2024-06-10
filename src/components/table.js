import React, { useState, useEffect } from 'react';
import '../styles/table.css'; // Import CSS for table styling

const Table = () => {
  const [jsonData, setJsonData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:4000/CO2.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setJsonData(data); // Set all the data from the JSON file
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div className="error">Error fetching data: {error.message}</div>;
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Years</th>
            <th>Agriculture</th>
            <th>Manufacturing</th>
            <th>Construction</th>
            <th>Transport</th>
            <th>Mining</th>
          </tr>
        </thead>
        <tbody>
          {jsonData.map((dataItem, index) => (
            <tr key={index}>
              <td>{dataItem.Years}</td>
              <td>{dataItem["Agriculture, forestry and fishing"]}</td>
              <td>{dataItem.Manufacturing}</td>
              <td>{dataItem.Construction}</td>
              <td>{dataItem["Transport and storage"]}</td>
              <td>{dataItem["Mining and quarrying"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
