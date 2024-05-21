// // import '../styles/analysis.css'; // Ensure you create this CSS file

// // import React, { useState, useEffect } from 'react';

// // const Analysis = () => {
// //   const [selectedFactory, setSelectedFactory] = useState('');
// //   const [co2Data, setCo2Data] = useState([]);
// //   const [showData, setShowData] = useState(false);

// //   useEffect(() => {
// //     fetch('/api/co2data')
// //       .then(response => response.json())
// //       .then(data => setCo2Data(data))
// //       .catch(error => console.error('Error fetching CO2 data:', error));
// //   }, []);

// //   const handleSelectChange = (event) => {
// //     setSelectedFactory(event.target.value);
// //   };

// //   const handleViewClick = () => {
// //     if (selectedFactory) {
// //       alert(`Selected factory: ${selectedFactory}`);
// //     }
// //     setShowData(true);
// //   };

// //   return (
// //     <div className="analysis-container">
// //       <h1 className="analysis-title">Analysis</h1>
// //       <form className="analysis-form">
// //         <label htmlFor="factory-select" className="factory-label">Select Factory:</label>
// //         <select
// //           id="factory-select"
// //           className="factory-select"
// //           value={selectedFactory}
// //           onChange={handleSelectChange}
// //         >
// //           <option value="" disabled>Select a factory</option>
// //           <option value="factory1">Factory 1</option>
// //           <option value="factory2">Factory 2</option>
// //           <option value="factory3">Factory 3</option>
// //           <option value="factory4">Factory 4</option>
// //           <option value="factory5">Factory 5</option>
// //         </select>
// //         <button
// //           type="button"
// //           className="view-button"
// //           onClick={handleViewClick}
// //         >
// //           View
// //         </button>
// //       </form>
// //       {showData && (
// //         <table className="co2-table">
// //           <thead>
// //             <tr>
// //               <th>Date</th>
// //               <th>Value</th>
// //             </tr>
// //           </thead>
// //           <tbody>
// //             {co2Data.map((data, index) => (
// //               <tr key={index}>
// //                 <td>{data.date}</td>
// //                 <td>{data.value}</td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // }

// // export default Analysis;

// // https://chat.openai.com/share/b67f530d-4ebe-438f-9c0e-a0b0a2aa3110

// import React, { useState, useEffect } from 'react';
// import '../styles/analysis.css'; // Ensure you create this CSS file

// const Analysis = () => {
//   const [co2Data, setCo2Data] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     fetch('/api/co2data')
//       .then(response => {
//         if (!response.ok) {
//           console.log("hiiiiiii");
//           return response.text().then(text => {
//             throw new Error(`Error: ${response.status} ${response.statusText}\n${text}`);
//           });
//         }
//         // else{
//         //   // console.log("hoooooooo");
//         // }
//         return response.json();
//       })
//       .then(data => {
//         console.log('CO2 data:', data);
//          // Check if data is properly received from the server
//          setCo2Data(data);
//         console.log(data);
//         })
//       .catch(error => {
//         console.error('Error fetching CO2 data:', error);
//         setError(error.message);
//       });
//   }, []);

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="analysis-container">
//       <h1 className="analysis-title">Analysis</h1>
//       <table className="co2-table">
//         <thead>
//           <tr>
//             <th>Date</th>
//             <th>Value</th>
//           </tr>
//         </thead>
//         <tbody>
//           {co2Data.map((data, index) => (
//             <tr key={index}>
//               <td>{new Date(data.date).toLocaleDateString()}</td>
//               <td>{data.value}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// export default Analysis;

import React, { useState, useEffect } from 'react';
import '../styles/analysis.css'; // Ensure you create this CSS file

const Analysis = () => {
  const [co2Data, setCo2Data] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/co2data') // Specify the correct port (5000)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Error: ${response.status} ${response.statusText}\n${text}`);
          });
        }
        return response.text(); // Get the response as text first
      })
      .then(text => {
        try {
          const data = JSON.parse(text); // Attempt to parse it as JSON
          console.log(data);
          setCo2Data(data);
          setLoading(false);
        } catch (e) {
          throw new Error('Invalid JSON response');
        }
      })
      .catch(error => {
        console.error('Error fetching CO2 data:', error);
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

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
              <td>{new Date(data.date).toLocaleDateString()}</td>
              <td>{data.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Analysis;
