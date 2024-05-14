


var mysql = require('mysql');
var { Web3 } = require('web3');

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

var contractAddress = '0x0a668fc69ed8e436dcde4e16e156e34cb9037753'; // Replace with your smart contract address
var abi = [
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
]
var contract = new web3.eth.Contract(abi, contractAddress);

// Function to transfer data from database to smart contract
async function transferDataToBlockchain() {
  con.query('SELECT * FROM va', function (err, rows) {
    if (err) {
      console.error('Error fetching CO2 data from database:', err.message);
      return;
    }

    rows.forEach(row => {
      var date = row.date.toString(); // Convert date to string before calling smart contract
      var value = row.value;

      // Call smart contract function to add CO2 data
      contract.methods.addCO2Data(date, value).send({ from: '0xD9B8E92217f19F6eBdF9613fd184F57dC022d610' }) // Replace with your Ethereum address
        .on('transactionHash', function(hash){
          console.log('Transaction hash:', hash);
        })
        .on('error', function(error){
          console.error('Error sending transaction:', error);
        });
    });
  });
}

// Call the function to transfer data
transferDataToBlockchain();
















// const express = require('express');
// const mongoose = require('mongoose');

// // Replace with your actual MongoDB connection string
// const mongoURI = 'mongodb://localhost:27017/factoryRegistry';

// // Define the factory schema for Mongoose
// const factorySchema = new mongoose.Schema({
//   factoryName: { type: String, required: true },
//   location: { type: String, required: true },
//   industry: { type: String, required: true },
//   contactName: { type: String, required: true },
//   contactEmail: { type: String, required: true },
//   username: { type: String, required: true },
//   password: { type: String, required: true },
// });

// const Factory = mongoose.model('Factory', factorySchema);

// const app = express();
// const port = process.env.PORT || 4000; // Use environment variable or default port

// // Connect to MongoDB
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Error connecting to MongoDB', err));

// // Parse incoming JSON data
// app.use(express.json());

// // API endpoint to handle factory registration
// app.post('/registerFactory', async (req, res) => {
//   const { factoryName, location, industry, contactName, contactEmail, username, password } = req.body;

//   try {
//     // Create a new factory document
//     const newFactory = new Factory({
//       factoryName,
//       location,
//       industry,
//       contactName,
//       contactEmail,
//       username,
//       password,
//     });

//     // Save the factory document to MongoDB
//     const savedFactory = await newFactory.save();

//     res.json({ message: 'Factory registered successfully!', data: savedFactory });

//   } catch (err) {
//     console.error('Error registering factory:', err);
//     res.status(500).json({ message: 'Error registering factory' });
//   }
// });

// app.listen(port, () => console.log(`Server listening on port ${port}`));

// var { Web3 } = require('web3');

// // Connect to Ethereum node
// var providerUrl = 'http://127.0.0.1:7545'; // Update with your Ethereum node URL
// var web3 = new Web3(providerUrl);

// var contractAddress = '0xc421e330c52317b3c09c7ad6c6683f9e2d3abed6'; // Replace with your smart contract address
// var abi = [
// 	{
// 		"constant": true,
// 		"inputs": [],
// 		"name": "print",
// 		"outputs": [
// 			{
// 				"name": "",
// 				"type": "string"
// 			}
// 		],
// 		"payable": false,
// 		"stateMutability": "view",
// 		"type": "function"
// 	}
// ]
// var contract = new web3.eth.Contract(abi, contractAddress);

// // Function to call the smart contract function and print "Hello World"
// async function callHelloWorld() {
//     try {
//         // Call the smart contract function to retrieve the "Hello World" string
//         const helloWorldString = await contract.methods.print().call();
//         console.log(helloWorldString);
//     } catch (error) {
//         console.error('Error calling smart contract:', error);
//     }
// }

// // Run the function to call the smart contract and print "Hello World"
// callHelloWorld();
