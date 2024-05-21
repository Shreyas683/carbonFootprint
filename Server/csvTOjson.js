const csv = require('csvtojson');
const fs = require('fs');
const path = require('path');

// Path to your CSV file
const csvFilePath = path.join(__dirname, '../public/Industry_co2_emission.csv'); // Replace 'data.csv' with your CSV file name

// Function to convert CSV to JSON
async function convertCsvToJson() {
    try {
        const jsonArray = await csv().fromFile(csvFilePath);

        // Output file path
        const jsonFilePath = path.join(__dirname, 'data.json'); // This will save the JSON data as 'data.json'
        
        // Write JSON data to file
        fs.writeFileSync(jsonFilePath, JSON.stringify(jsonArray, null, 2), 'utf8');
        
        console.log('CSV file successfully converted to JSON!');
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
    }
}

// Call the function
convertCsvToJson();

// csv -> json  -> IPFS -> retrive -> json form -> frontend -> visualization
