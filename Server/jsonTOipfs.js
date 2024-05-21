const pinataSDK = require('@pinata/sdk');
const fs = require('fs');

const pinata = new pinataSDK('d376b0f02bf5d311e971', '56b6cd9adea56b76fbc74daf1e548196a5f12682f4fcefefc17c0da26a67a8ff');

async function saveText() {
    try {
        const options = {
            pinataMetadata: {
                name: 'MyFile',
                keyvalues: {
                    customKey: 'customValue'
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const readableStreamForFile = fs.createReadStream('./data.json');
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);

        console.log(result);
    } catch (error) {
        console.error("Error adding file to Pinata:", error);
    }
}

saveText();
