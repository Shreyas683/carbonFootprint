// JsonConverter.js
import React, { useEffect } from "react";

const JsonConverter = ({ file, factoryName, onConversionComplete }) => {
  useEffect(() => {
    if (!file) return;

    const parseCsv = (csv) => {
      const rows = csv.split(/\r?\n/); // Handles both Windows and Unix line endings
      const headers = rows[0].split(",");
      const data = rows.slice(1).map((row) => {
        const values = row.split(",");
        const record = {};
        headers.forEach((header, index) => {
          let value = values[index];
          // Check if the value exists and is not an empty string
          if (value !== undefined && value !== "") {
            // Remove double quotes if present
            value = value.replace(/"/g, "");
            // Convert to number if possible
            if (!isNaN(value) && value.trim() !== "") {
              value = parseFloat(value.replace(/,/g, ""));
            }
          }
          record[header.trim()] = value;
        });
        return record;
      });
      return data;
    };

    const transformData = (data) => {
      return data.map((record) => ({
        Year: record.Year,
        CO2: record.CO2 ? record.CO2.toLocaleString() : "", // Check if CO2 exists before calling toLocaleString
        CH4: record.CH4 ? record.CH4.toLocaleString() : "", // Check if CH4 exists before calling toLocaleString
        N2O: record.N2O ? record.N2O.toLocaleString() : "", // Check if N2O exists before calling toLocaleString
      }));
    };

    // const transformData = (data) => {
    //   return data.map((item) => {
    //     // Check if CO2 exists and is a string before calling replace method
    //     const CO2 = typeof item.CO2 === 'string' ? item.CO2.replace(",", "") : item.CO2;
    //     const CH4 = typeof item.CH4 === 'string' ? item.CH4.replace(",", "") : item.CH4;
    //     const N2O = typeof item.N2O === 'string' ? item.N2O.replace(",", "") : item.N2O;
    
    //     return {
    //       ...item,
    //       CO2,
    //       CH4,
    //       N2O
    //     };
    //   });
    // };

    const fileReader = new FileReader();
    fileReader.onload = () => {
      const csvContent = fileReader.result;
      const parsedData = parseCsv(csvContent);
      const transformedData = transformData(parsedData);
      const jsonData = JSON.stringify(transformedData, null, 2);

      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${factoryName}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Save the file to the server
      const formData = new FormData();
      formData.append("file", blob, `${factoryName}.json`);
      formData.append("factoryName", factoryName);

      fetch("http://localhost:3005/store-json", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("JSON file stored successfully:", data);
          onConversionComplete("JSON file created and download initiated successfully.");
        })
        .catch((error) => {
          console.error("Error storing JSON file:", error);
          onConversionComplete("Failed to store JSON file: " + error.message);
        });
    };
    fileReader.readAsText(file);
  }, [file, factoryName, onConversionComplete]);

  return null; // This component does not render anything
};

export default JsonConverter;
