const mongoose = require('mongoose');
const Listing = require('../models/Listings'); // Adjust the path if necessary
const fs = require('fs');
const path = require('path');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/user_profiles')
  .then(() => {
    console.log('✅ Connected to MongoDB for seeding listings');
  })
  .catch((error) => {
    console.error('❌ Connection error:', error);
    process.exit(1); // Exit process with failure
  });

// Sample Listings Data
const listings = [
  {
    title: 'Vintage Camera',
    description: 'A classic vintage camera in excellent condition.',
    price: '150',
    photoPath: 'Banana-Single.jpg', // Path to the image file
    user: 'austin', // Replace with an existing username from your Users collection
  },
  {
    title: 'Mountain Bike',
    description: 'A sturdy mountain bike suitable for all terrains.',
    price: '300',
    photoPath: 'Banana-Single.jpg',
    user: 'alex',
  },
];

// Function to read image files and convert to Buffer
const getImageBuffer = (imagePath) => {
  try {
    const fullPath = path.join(__dirname, imagePath);
    const imageData = fs.readFileSync(fullPath);
    const contentType = `image/${path.extname(fullPath).substring(1)}`; // e.g., image/jpeg
    return { data: imageData, contentType };
  } catch (error) {
    console.error(`Error reading image at ${imagePath}:`, error);
    return { data: null, contentType: null };
  }
};

// Seed Function
const seedListings = async () => {
  try {
    // Clear existing listings
    //await Listing.deleteMany({});
    console.log('🗑️ Existing listings cleared.');

    // Prepare listings with photo data
    const listingsWithPhotos = listings.map((listing) => {
      const { data, contentType } = getImageBuffer(listing.photoPath);
      if (!data || !contentType) {
        throw new Error(`Failed to process photo for listing: ${listing.title}`);
      }
      return {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        photo: {
          data,
          contentType,
        },
        user: listing.user,
      };
    });

    // Insert listings into the database
    await Listing.insertMany(listingsWithPhotos);
    console.log('✅ Listings seeded successfully.');

  } catch (error) {
    console.error('❌ Error seeding listings:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  }
};

// Run the seed function
seedListings();
