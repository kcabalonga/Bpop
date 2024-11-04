// Import required modules
const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const { createUser } = require('../models/Users'); // Import your createUser function from the Users model

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user_profiles', {
  useNewUrlParser: true, // Use the new URL string parser
  useUnifiedTopology: true, // Use the new topology engine
});

// Define a user data array to seed the database
//if you want to add more seeding data, use the format seen below 
const users = [
  {
    name: 'Austin',
    age: 28,
    email: 'austin@example.com',
  },
  {
    name: 'Brio',
    age: 39,
    email: 'Brio@example.com',
  },
  {
    name: 'Kaylee',
    age: 16,
    email: 'Kaylee@example.com',
  },
  {
    name: 'Kirsten',
    age: 55,
    email: 'Kirsten@example.com',
  },
  {
    name: 'Celine',
    age: 34,
    email: 'Celine@example.com',
  },
];

// Seed function to add users to the database
const seedDatabase = async () => {
  try {
    // Loop through each user in the users array
    for (const userData of users) {
      // Check if the user already exists to prevent duplicates
      const existingUser = await mongoose.model('User').findOne({ email: userData.email });
      if (!existingUser) {
        // Create a new user if it does not exist
        const createdUser = await createUser(userData);
        console.log('User created successfully:', createdUser);
      } else {
        // Log a message if the user already exists
        console.log('User with this email already exists:', existingUser);
      }
    }
  } catch (error) {
    // Log any errors that occur during seeding
    console.error('Error seeding database:', error);
  } finally {
    // Close the database connection
    mongoose.connection.close();
  }
};

// Call the seed function
seedDatabase();