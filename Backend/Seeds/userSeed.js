// Import required modules
const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const { User } = require('../models/Users'); // Import your createUser function from the Users model

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
    username: 'austinsaccount',
    email: 'austin@example.com',
    password: 'Austin123',
  },
  {
    name: 'Brio',
    username: 'briosaccount',
    email: 'Brio@example.com',
    password: 'Brio123',
  },
  {
    name: 'Kaylee',
    username: 'kayleesaccount',
    email: 'Kaylee@example.com',
    password: 'Kaylee123'
  },
  {
    name: 'Kirsten',
    username: 'kirstensaccount',
    email: 'Kirsten@example.com',
    password: 'Kirsten123'
  },
  {
    name: 'Celine',
    username: 'celinesaccount',
    email: 'Celine@example.com',
    password: 'Celine123'
  },
  {
    name: 'Hank',
    username: 'hanksaccount',
    email: 'Hank@example.com',
    password: 'Hank123'
  },
  {
    name: 'John',
    username: 'johnsaccount',
    email: 'John@example.com',
    password: 'John123'
  },
  {
    name: 'Jane',
    username: 'janesaccount',
    email: 'Jane@example.com',
    password: 'Jane123'
  },
  {
    name: 'Dave',
    username: 'davesaccount',
    email: 'Dave@example.com',
    password: 'Dave123'
  },
  {
    name: 'Sam',
    username: 'samsaccount',
    email: 'Sam@example.com',
    password: 'Sam123'
  },
];

// Seed function to add users to the database
const seedDatabase = async () => {
  try {
    // Loop through each user in the users array
    for (const userData of users) {
      // Check if the user already exists to prevent duplicates
      const existingUser = await User.findOne({ username: userData.username });
      if (!existingUser) {
        // Create a new user if it does not exist
        const createdUser = new User(userData);
        await createdUser.save();
        console.log('User created successfully:', createdUser);
      } else {
        // Log a message if the user already exists
        console.log('User with this username already exists:', existingUser);
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