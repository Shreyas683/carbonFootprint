const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors package

const app = express();
const port = 5000; // or any port of your choice

// Middleware
app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:3000'
  }));
  
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/factoryRegistry', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a schema
const factorySchema = new mongoose.Schema({
  factoryName: String,
  location: String,
  industry: String,
  contactName: String,
  contactEmail: String,
  username: String,
  password: String,
});

// Create a model
const Factory = mongoose.model('Factory', factorySchema);

// Define the register route
app.post('/registerFactory', async (req, res) => {
  const { factoryName, location, industry, contactName, contactEmail, username, password } = req.body;

  const newFactory = new Factory({
    factoryName,
    location,
    industry,
    contactName,
    contactEmail,
    username,
    password
  });

  try {
    const savedFactory = await newFactory.save();
    res.status(201).json(savedFactory);
  } catch (error) {
    res.status(500).json({ message: 'Error registering factory', error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
