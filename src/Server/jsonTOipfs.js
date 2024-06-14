const express = require('express');
const multer = require('multer');
const pinataSDK = require('@pinata/sdk');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());

const pinata = new pinataSDK('d376b0f02bf5d311e971', '56b6cd9adea56b76fbc74daf1e548196a5f12682f4fcefefc17c0da26a67a8ff');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });

app.use(express.json());

app.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const factoryName = req.body.factoryName;
        const file = req.file;

        const options = {
            pinataMetadata: {
                name: file.originalname,
                keyvalues: {
                    factoryName: factoryName
                }
            },
            pinataOptions: {
                cidVersion: 0
            }
        };

        const readableStreamForFile = fs.createReadStream(path.join(__dirname, 'uploads', file.filename));
        const result = await pinata.pinFileToIPFS(readableStreamForFile, options);

        res.status(200).json(result);
    } catch (error) {
        console.error("Error adding file to Pinata:", error);
        res.status(500).json({ error: "Error adding file to Pinata" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
