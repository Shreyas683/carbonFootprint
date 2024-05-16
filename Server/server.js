var mysql = require('mysql');
var { Web3 } = require('web3');
const express = require('express');

const app = express();
const port = 5000;

// Connect to MySQL database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "co2"
});

// Connect to Ethereum node
var providerUrl = 'http://127.0.0.1:7545'; // Update with your Ethereum node URL
var web3 = new Web3(providerUrl);

// Smart contract configuration
var contractAddress = '0x5fe0819ec2430078045b71433ddec01582e72650'; // Replace with your smart contract address
var abi = [
  {
    "constant": false,
    "inputs": [
      { "name": "_date", "type": "string" },
      { "name": "_value", "type": "uint256" }
    ],
    "name": "addCO2Data",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [{ "name": "", "type": "uint256" }],
    "name": "co2Readings",
    "outputs": [
      { "name": "date", "type": "string" },
      { "name": "value", "type": "uint256" }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "nextReadingId",
    "outputs": [{ "name": "", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "id", "type": "uint256" },
      { "indexed": false, "name": "date", "type": "string" },
      { "indexed": false, "name": "value", "type": "uint256" }
    ],
    "name": "CO2DataAdded",
    "type": "event"
  }
];
var contract = new web3.eth.Contract(abi, contractAddress);

// Function to transfer data from database to smart contract
async function transferDataToBlockchain() {
  con.query('SELECT * FROM va', async function (err, rows) {
    if (err) {
      console.error('Error fetching CO2 data from database:', err.message);
      return;
    }

    for (const row of rows) {
      var date = row.date.toString(); // Convert date to string before calling smart contract
      var value = row.value;

      try {
        // Estimate gas required for the transaction
        const gasEstimate = await contract.methods.addCO2Data(date, value).estimateGas({ 
          from: '0x8169F3fC827bbE0Daa9F77377E2567c5A4A0686B' // Replace with your Ethereum address
        });

        // Call smart contract function to add CO2 data with estimated gas
        await contract.methods.addCO2Data(date, value).send({ 
          from: '0x8169F3fC827bbE0Daa9F77377E2567c5A4A0686B', // Replace with your Ethereum address
          gas: gasEstimate
        });
        console.log('Data added:', { date, value });
      } catch (error) {
        console.error('Error sending transaction:', error);
      }
    }
  });
}

// Endpoint to fetch CO2 data from blockchain
app.get('/api/co2data', async (req, res) => {
  try {
    const nextReadingId = await contract.methods.nextReadingId().call();
    const co2Data = [];

    for (let i = 0; i < nextReadingId; i++) {
      const reading = await contract.methods.co2Readings(i).call();
      co2Data.push(reading);
    }

    res.json(co2Data);
  } catch (error) {
    console.error('Error fetching data from blockchain:', error);
    res.status(500).send('Error fetching data from blockchain');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Transfer data from database to blockchain on server start
transferDataToBlockchain();
