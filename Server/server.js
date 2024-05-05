const express = require('express');
const mongoose = require('mongoose');

// Replace with your actual MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/factoryRegistry';

// Define the factory schema for Mongoose
const factorySchema = new mongoose.Schema({
  factoryName: { type: String, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true },
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
});

const Factory = mongoose.model('Factory', factorySchema);

const app = express();
const port = process.env.PORT || 4000; // Use environment variable or default port

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Parse incoming JSON data
app.use(express.json());

// API endpoint to handle factory registration
app.post('/registerFactory', async (req, res) => {
  const { factoryName, location, industry, contactName, contactEmail, username, password } = req.body;

  try {
    // Create a new factory document
    const newFactory = new Factory({
      factoryName,
      location,
      industry,
      contactName,
      contactEmail,
      username,
      password,
    });

    // Save the factory document to MongoDB
    const savedFactory = await newFactory.save();

    res.json({ message: 'Factory registered successfully!', data: savedFactory });

  } catch (err) {
    console.error('Error registering factory:', err);
    res.status(500).json({ message: 'Error registering factory' });
  }
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
