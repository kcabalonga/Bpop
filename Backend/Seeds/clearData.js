const readline = require('readline');
const mongoose = require('mongoose');
const { User } = require('../models/Users');
const { Listing } = require('../models/Listings');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user_profiles');

mongoose.connection.once('open', async () => {
  console.log('✅ Connected to MongoDB');
  
  rl.question('⚠️ WARNING: This will delete ALL users and listings in the database. Are you sure? (yes/no): ', async (answer) => {
    if (answer.toLowerCase() === 'yes') {
      try {
        await User.deleteMany({});
        console.log('✅ All users deleted.');

        await Listing.deleteMany({});
        console.log('✅ All listings deleted.');
      } catch (error) {
        console.error('❌ Error deleting data:', error);
      } finally {
        await mongoose.connection.close(); // Promise-based closing
        console.log('🔒 Database connection closed.');
        rl.close();
      }
    } else {
      console.log('❌ Operation cancelled.');
      await mongoose.connection.close(); // Promise-based closing
      console.log('🔒 Database connection closed.');
      rl.close();
    }
  });
});