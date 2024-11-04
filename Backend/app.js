// backend/app.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const { createUser } = require('./models/Users'); // Import the createUser function from users.js
//const cors = require('cors'); // Optional: If you have a frontend making requests

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
//app.use(cors()); // Optional: Enable CORS if accessing from frontend

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user_profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

// MongoDB connection error handling
db.on('error', console.error.bind(console, '❌ Connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});


// Define routes (if any)
// Example: Simple route to test the server
app.get('/', (req, res) => {
  res.send('Hello, the server is running!');
});

// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});