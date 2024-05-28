const {Web3} = require('web3');
const axios = require('axios');

// Replace with your Infura endpoint
const web3 = new Web3('https://holesky.infura.io/v3/7c6de6f84bbf488e91bace40bfadee04');

// Replace with the ABI of your compiled contract
const contractABI = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "setHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getHash",
		"outputs": [
			{
				"name": "",
				"type": "string"
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
				"name": "newHash",
				"type": "string"
			}
		],
		"name": "HashSet",
		"type": "event"
	}
];


// Replace with your deployed contract address
const contractAddress = '0xcc0D8Fc7c07a48ad17a1dbA752B4c99b24E2bD61';
const contract = new web3.eth.Contract(contractABI, contractAddress);

// Replace with your Ethereum account address and private key
const accountAddress = '0xa486985EAbfdc9930E6d4B83371b63876692B8f6';
const privateKey = '0x3073fde9da59774a3f9d08c9113a485c615da8f3035b6c66135c48e26cf82a1a';

// Pinata API credentials
const pinataApiKey = 'd376b0f02bf5d311e971';
const pinataSecretApiKey = '56b6cd9adea56b76fbc74daf1e548196a5f12682f4fcefefc17c0da26a67a8ff';

// Function to store hash on the blockchain
async function storeHashOnBlockchain(hash) {
    try {
        const tx = contract.methods.setHash(hash);
        const gas = await tx.estimateGas({ from: accountAddress });
        const gasPrice = await web3.eth.getGasPrice();
        const data = tx.encodeABI();
        const nonce = await web3.eth.getTransactionCount(accountAddress);

        console.log(`Estimated gas for setHash: ${gas}`);

        const signedTx = await web3.eth.accounts.signTransaction(
            {
                to: contractAddress,
                data,
                gas,
                gasPrice,
                nonce,
                chainId: 1 // Mainnet chain ID
            },
            privateKey
        );

        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt for setHash:', receipt);
    } catch (error) {
        console.error('Error in storeHashOnBlockchain:', error);
    }
}

// Function to retrieve stored hash from the blockchain
async function getStoredHash() {
    try {
        const hash = await contract.methods.getHash().call();
        console.log('Stored IPFS Hash:', hash);
        return hash;
    } catch (error) {
        console.error('Error in getStoredHash:', error);
    }
}

// Function to retrieve file from IPFS using Pinata
async function retrieveFileFromPinata(ipfsHash) {
    try {
        const response = await axios.get(`}https://gateway.pinata.cloud/ipfs/${ipfsHash`, {
            headers: {
                'pinata_api_key': pinataApiKey,
                'pinata_secret_api_key': pinataSecretApiKey
            }
        });
        console.log('Retrieved file from Pinata:', response.data);
    } catch (error) {
        console.error('Error in retrieveFileFromPinata:', error);
    }
}

// Example usage
(async () => {
    await storeHashOnBlockchain('QmX1PHZW6xM47ds8CgoMfXFAtQryfDAm5y8Jv11uP8iZ7S');
    const ipfsHash = await getStoredHash();
    if (ipfsHash) {
        await retrieveFileFromPinata('QmX1PHZW6xM47ds8CgoMfXFAtQryfDAm5y8Jv11uP8iZ7S');
    }
})();
