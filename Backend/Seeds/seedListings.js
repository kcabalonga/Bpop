const mongoose = require('mongoose');
const { Listing } = require('../models/Listings'); // Adjust the path if necessary
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
    photoPath: './images/Banana-Single.jpg', // Path to the image file
    user: 'austinsaccount', // Replace with an existing username from your Users collection
    tags: ['vintage', 'object']
  },
  {
    title: 'Mountain Bike',
    description: 'A sturdy mountain bike suitable for all terrains.',
    price: '300',
    photoPath: './images/Banana-Single.jpg',
    user: 'kayleesaccount',
    tags: ['modern', 'object']
  },
  {
    title: 'Cool Shirt',
    description: 'An amazing shirt that will make you ten times cooler. Slightly damaged from years of usage and love.',
    price: '27',
    photoPath: './images/shirt1.jpg',
    user: 'briosaccount',
    tags: ['short-sleeve', 'shirt', 'graphic']
  },
  {
    title: 'Magician hat',
    description: 'Pristine Magician Hat perfect for pulling rabbits out of',
    price: '15',
    photoPath: './images/mhat.jpg',
    user: 'janesaccount',
    tags: ['hat']
  },
  {
    title: 'Pringle Socks',
    description: 'Swaggy pringle socks that are super cool',
    price: '19',
    photoPath: './images/pringlesock.jpg',
    user: 'janesaccount',
    tags: ['graphic', 'socks']
  },
  {
    title: 'fancy sunglasses',
    description: 'good sunglasses to wear when its bright',
    price: '40',
    photoPath: './images/sunglasses.jpg',
    user: 'davesaccount',
    tags: ['vintage', 'accessory']
  },
  {
    title: 'Maroon Beanie',
    description: 'Nice beanie, warm and stylish. Perfect for breezy fall days',
    price: '53',
    photoPath: './images/Beanie.jpg',
    user: 'samsaccount',
    tags: ['hat']
  },
  {
    title: 'Black Athletic Shorts',
    description: 'Black athletic shorts, perfect for working out or playing sports',
    price: '36',
    photoPath: './images/AthleticShorts.jpg',
    user: 'samsaccount',
    tags: ['shorts', 'athletic']
  },
  {
    title: 'Puffy Jacket',
    description: 'Warm puffy winter jacket, black with furry hood',
    price: '70',
    photoPath: './images/PuffyJacket.jpg',
    user: 'johnsaccount',
    tags: ['jacket', 'long-sleeve']
  },
  {
    title: 'Yellow Long Sleeve Shirt',
    description: 'Yellow long sleeve shirt. Very comfortable',
    price: '39',
    photoPath: './images/YellowShirt.jpg',
    user: 'celinesaccount',
    tags: ['shirt', 'long-sleeve']
  },
  {
    title: 'Black Hoodie',
    description: 'Black Hoodie with heavy wear.',
    price: '39',
    photoPath: './images/BlackHoodie.jpg',
    user: 'hanksaccount',
    tags: ['jacket']
  },
  {
    title: 'Rainbow Towel Set',
    description: 'Five towel set, each a different color of the rainbow.',
    price: '20',
    photoPath: './images/Towels.jpg',
    user: 'hanksaccount',
    tags: ['object', 'modern']
  },
  {
    title: 'Plush Blanket',
    description: 'Single grey plush blanket. Very soft.',
    price: '30',
    photoPath: './images/Blanket.jpg',
    user: 'hanksaccount',
    tags: ['object', 'modern']
  },
  {
    title: 'Fancy Pens',
    description: 'Three-pen set of high-end pens that will last you a lifetime.',
    price: '50',
    photoPath: './images/Pens.jpg',
    user: 'kirstensaccount',
    tags: ['modern', 'object']
  },
  {
    title: 'Radio',
    description: 'Old radio. Lowkey unreliable but cheap so might aswell buy it',
    price: '10',
    photoPath: './images/Radio.jpg',
    user: 'davesaccount',
    tags: ['vintage', 'object']
  },
  {
    title: 'Bike Helmet',
    description: 'Good-condition bike helmet. Very durable',
    price: '17',
    photoPath: './images/Helmet.jpg',
    user: 'davesaccount',
    tags: ['modern', 'object']
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
        tags: listing.tags
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
