const express = require("express");
const mysql = require("mysql");
const { Web3 } = require("web3");
const app = express();
const port = 5000;
const cors = require('cors');


// Middleware to parse JSON
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));


// Connect to MySQL database
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Update with your MySQL root password
  database: "co2", // Update with your database name
});

con.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err.message);
  } else {
    console.log("Connected to MySQL");
  }
});

// Connect to Ethereum node
const providerUrl = "http://127.0.0.1:7545"; // Update with your Ethereum node URL
const web3 = new Web3(providerUrl);

// Smart contract configuration
const contractAddress = "0xBA3729890B15Ef91fEEe61aA0EFF2C951591046d"; // Replace with your smart contract address
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_date",
				"type": "string"
			},
			{
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "addCO2Data",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "co2Readings",
		"outputs": [
			{
				"name": "date",
				"type": "string"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "nextReadingId",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "date",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "CO2DataAdded",
		"type": "event"
	}
];
const contract = new web3.eth.Contract(abi, contractAddress);

// Function to transfer data from database to blockchain
async function transferDataToBlockchain() {
  con.query("SELECT * FROM va", async (err, rows) => {
    if (err) {
      console.error("Error fetching CO2 data from database:", err.message);
      return;
    }

    for (const row of rows) {
      const date = new Date(row.date).toISOString(); // Convert date to ISO string format
      const value = row.value;

      try {
        // Estimate gas required for the transaction
        const gasEstimate = await contract.methods
          .addCO2Data(date, value)
          .estimateGas({
            from: "0xa719a37808b4260062aD7E8e003CA38D11b7d93D", // Replace with your Ethereum address
          });

        // Call smart contract function with estimated gas
        const tx = await contract.methods.addCO2Data(date, value).send({
          from: "0xa719a37808b4260062aD7E8e003CA38D11b7d93D", // Replace with your Ethereum address
          gas: gasEstimate,
        });

        const valueString = value.toString();
        console.log("Data added:", {
          date,
          valueString,
          txHash: tx.transactionHash,
        });

        // Update database with transaction hash (optional)
      } catch (error) {
        console.error("Error sending transaction:", error);
      }
    }
  });
}

// Endpoint to fetch CO2 data from blockchain
app.get("/api/co2data", async (req, res) => {
  try {
    const nextReadingId = await contract.methods.nextReadingId().call();
    console.log("nextReadingId:", nextReadingId);

    const co2Data = [];
    for (let i = 0; i < nextReadingId; i++) {
      const reading = await contract.methods.co2Readings(i).call();
      console.log("Reading:", reading);
      co2Data.push(reading);
    }

    res.json(co2Data);
  } catch (error) {
    console.error("Error fetching data from blockchain:", error);
    res.status(500).send("Error fetching data from blockchain");
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Transfer data from database to blockchain on server start
transferDataToBlockchain();
