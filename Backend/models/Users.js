// users.js

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

// Define User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true }
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Function to get user details by user ID
const getUser = (userId) => {
  return new Promise((resolve, reject) => {
    User.findById(userId, (err, user) => {
      if (err || !user) {
        return reject('User not found');
      }
      resolve(user);
    });
  });
};

// Function to create a new user
// models/Users.js

const createUser = async (userData) => {
	const user = new User(userData);
	try {
	  const savedUser = await user.save();
	  return savedUser;
	} catch (err) {
	  throw err;
	}
  };
  

// Function to update an existing user
const updateUser = (userId, userData) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndUpdate(userId, userData, { new: true }, (err, updatedUser) => {
      if (err || !updatedUser) {
        return reject('User not found or update failed');
      }
      resolve(updatedUser);
    });
  });
};

// Function to delete a user
const deleteUser = (userId) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(userId, (err) => {
      if (err) {
        return reject('User not found or deletion failed');
      }
      resolve('User deleted successfully');
    });
  });
};

// Export the functions
module.exports = {
  getUser,
  createUser,
  updateUser,
  deleteUser,
  User
};