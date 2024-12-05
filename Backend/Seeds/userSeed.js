// Import required modules
const mongoose = require('mongoose'); // Import mongoose to interact with MongoDB
const fs = require('fs'); // Import fs to handle file operations
const path = require('path'); // Import path for file paths
const { User } = require('../models/Users'); // Import your createUser function from the Users model
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing


// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/user_profiles', {
  useNewUrlParser: true, // Use the new URL string parser
  useUnifiedTopology: true, // Use the new topology engine
});

saltRounds = 8;  //higher the number, better the security but worse the speed

// Define a user data array to seed the database
//if you want to add more seeding data, use the format seen below 
const users = [
  {
    name: 'Austin',
    username: 'austinsaccount',
    email: 'austin@example.com',
    password: 'Austin123',
    photoPath:'./images/default.jpg'

  },
  {
    name: 'Brio',
    username: 'briosaccount',
    email: 'Brio@example.com',
    password: 'Brio123',
    photoPath:'./images/default.jpg'
  },
  {
    name: 'Kaylee',
    username: 'kayleesaccount',
    email: 'Kaylee@example.com',
    password: 'Kaylee123',
    photoPath:'./images/default.jpg'
  },
  {
    name: 'Kirsten',
    username: 'kirstensaccount',
    email: 'Kirsten@example.com',
    password: 'Kirsten123',
    photoPath:'./images/default.jpg'
  },
  {
    name: 'Celine',
    username: 'celinesaccount',
    email: 'Celine@example.com',
    password: 'Celine123',
    photoPath:'./images/default.jpg'

  },
  {
    name: 'Hank',
    username: 'hanksaccount',
    email: 'Hank@example.com',
    password: 'Hank123',
    photoPath:'./images/hank.jpg'
  },
  {
    name: 'John',
    username: 'johnsaccount',
    email: 'John@example.com',
    password: 'John123',
    photoPath:'./images/john.jpg'
  },
  {
    name: 'Jane',
    username: 'janesaccount',
    email: 'Jane@example.com',
    password: 'Jane123',
    photoPath:'./images/jane.jpg'
  },
  {
    name: 'Dave',
    username: 'davesaccount',
    email: 'Dave@example.com',
    password: 'Dave123',
    photoPath:'./images/pinkFlower.jpg'
  },
  {
    name: 'Sam',
    username: 'samsaccount',
    email: 'Sam@example.com',
    password: 'Sam123',
    photoPath:'./images/piano.jpg'
  },
];

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

const seedDatabase = async () => {
  try {
    await User.deleteMany({});
    console.log('🗑️ Existing users cleared.');

    for (const user of users) {
      const { data, contentType } = getImageBuffer(user.photoPath);
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);

      const userData = {
        name: user.name,
        username: user.username,
        email: user.email,
        password: hashedPassword,
        photo: data ? { data, contentType } : null,
      };

      const createdUser = new User(userData);
      await createdUser.save();
      console.log('✅ User created successfully:', createdUser.username);
    }
  } catch (error) {
    console.error('❌ Error seeding users:', error);
  } finally {
    mongoose.connection.close();
    console.log('🔌 MongoDB connection closed.');
  }
};

// Call the seed function
seedDatabase();