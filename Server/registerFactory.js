const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3002;

// Middleware
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/factoryRegistry", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Define a schema
const factorySchema = new mongoose.Schema({
  factoryName: { type: String, required: true },
  location: { type: String, required: true },
  industry: { type: String, required: true },
  contactName: { type: String, required: true },
  contactEmail: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Create a model
const Factory = mongoose.model("Factory", factorySchema);

// Define the register route
app.post("/registerFactory", async (req, res) => {
  const {
    factoryName,
    location,
    industry,
    contactName,
    contactEmail,
    username,
    password,
  } = req.body;

  if (
    !factoryName ||
    !location ||
    !industry ||
    !contactName ||
    !contactEmail ||
    !username ||
    !password
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newFactory = new Factory({
    factoryName,
    location,
    industry,
    contactName,
    contactEmail,
    username,
    password,
  });

  try {
    const savedFactory = await newFactory.save();
    res.status(201).json(savedFactory);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Username already exists" });
    }
    res.status(500).json({ message: "Error registering factory", error });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
