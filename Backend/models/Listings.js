// Listings.js

// Import Mongoose
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user_profiles', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, '❌ Connection error:'));
db.once('open', () => {
  console.log('✅ Connected to MongoDB');
});

// Define Listings Schema
const listingsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  photo: {
    data: { type: Buffer, required: true },          // Ensuring the photo data is required
    contentType: { type: String, required: true },    // Ensuring the content type (MIME type) is required

  },
  user: {type: Mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }    
});

// Create User Model
const Listings = mongoose.model('Listings', postSchema);

module.exports = {
  Listings
};