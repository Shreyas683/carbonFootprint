// const csv = require('csvtojson');
// const fs = require('fs');
// const path = require('path');

// // Path to your CSV file
// const csvFilePath = path.join(__dirname, '../public/CO2_csv.csv'); // Replace 'data.csv' with your CSV file name

// // Function to convert CSV to JSON
// async function convertCsvToJson() {
//     try {
//         const jsonArray = await csv().fromFile(csvFilePath);

//         // Output file path
//         const jsonFilePath = path.join(__dirname, 'CO2.json'); // This will save the JSON data as 'data.json'

//         // Write JSON data to file
//         fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf8');

//         console.log('CSV file successfully converted to JSON!');
//     } catch (error) {
//         console.error('Error converting CSV to JSON:', error);
//     }
// }

// // Call the function
// convertCsvToJson();

// // csv -> json  -> IPFS -> retrive -> json form -> frontend -> visualization

const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 5000;

app.use(fileUpload());
app.use(express.json());

app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.file;
  const uploadPath = path.join(__dirname, "uploads", file.name);

  file.mv(uploadPath, (err) => {
    if (err) return res.status(500).send(err);

    // Simulating IPFS hash for demonstration purposes
    const ipfsHash = "QmFakeIpfsHashForDemoPurpose";

    res.json({ IpfsHash: ipfsHash });
  });
});

app.post("/store-json", (req, res) => {
  const jsonData = req.body;

  const fileName = `data_${Date.now()}.json`;
  const filePath = path.join(__dirname, "data", fileName);

  fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error writing JSON file:", err);
      return res.status(500).send("Failed to store JSON data");
    }

    res.send("JSON data stored successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
