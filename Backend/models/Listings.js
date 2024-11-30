// backend/models/Listings.js

// Import Mongoose
const mongoose = require('mongoose');

// Define Listings Schema
const listingSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  photo: {
    data: { type: Buffer, required: true },          // Ensuring the photo data is required
    contentType: { type: String, required: true },   // Ensuring the content type (MIME type) is required
  },
  user: { type: String, required: true },  // This will be filled in upon creation of listings by session username
  date: { type: Date, default: Date.now },
  tags: { type: [String], default: [] }, // Array of tags, default to empty array
});

function addDate(){
  date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}




// Create Listing Model
const Listing = mongoose.model('Listing', listingSchema);

// Log the Listing model to verify it's defined
console.log('Listing Model inside Listings.js:', Listing);

// Export the Listing model
module.exports = { Listing, addDate };
