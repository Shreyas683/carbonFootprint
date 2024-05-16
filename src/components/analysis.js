// import '../styles/analysis.css'; // Ensure you create this CSS file

// import React, { useState, useEffect } from 'react';

// const Analysis = () => {
//   const [selectedFactory, setSelectedFactory] = useState('');
//   const [co2Data, setCo2Data] = useState([]);
//   const [showData, setShowData] = useState(false);

//   useEffect(() => {
//     fetch('/api/co2data')
//       .then(response => response.json())
//       .then(data => setCo2Data(data))
//       .catch(error => console.error('Error fetching CO2 data:', error));
//   }, []);

//   const handleSelectChange = (event) => {
//     setSelectedFactory(event.target.value);
//   };

//   const handleViewClick = () => {
//     if (selectedFactory) {
//       alert(`Selected factory: ${selectedFactory}`);
//     }
//     setShowData(true);
//   };

//   return (
//     <div className="analysis-container">
//       <h1 className="analysis-title">Analysis</h1>
//       <form className="analysis-form">
//         <label htmlFor="factory-select" className="factory-label">Select Factory:</label>
//         <select
//           id="factory-select"
//           className="factory-select"
//           value={selectedFactory}
//           onChange={handleSelectChange}
//         >
//           <option value="" disabled>Select a factory</option>
//           <option value="factory1">Factory 1</option>
//           <option value="factory2">Factory 2</option>
//           <option value="factory3">Factory 3</option>
//           <option value="factory4">Factory 4</option>
//           <option value="factory5">Factory 5</option>
//         </select>
//         <button
//           type="button"
//           className="view-button"
//           onClick={handleViewClick}
//         >
//           View
//         </button>
//       </form>
//       {showData && (
//         <table className="co2-table">
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Value</th>
//             </tr>
//           </thead>
//           <tbody>
//             {co2Data.map((data, index) => (
//               <tr key={index}>
//                 <td>{data.date}</td>
//                 <td>{data.value}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Analysis;



// https://chat.openai.com/share/b67f530d-4ebe-438f-9c0e-a0b0a2aa3110


import '../styles/analysis.css'; // Ensure you create this CSS file

import React, { useState, useEffect } from 'react';

const Analysis = () => {
  const [co2Data, setCo2Data] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('/api/co2data')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch CO2 data');
        }
        return response.json();
      })
      .then(data => {
        console.log('CO2 data:', data); // Check if data is properly received from the server
        setCo2Data(data);
      })
      .catch(error => {
        console.error('Error fetching CO2 data:', error);
        setError(error.message);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="analysis-container">
      <h1 className="analysis-title">Analysis</h1>
      <table className="co2-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {co2Data.map((data, index) => (
            <tr key={index}>
              <td>{data.date}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Analysis;
