// backend/app.js

// Import required modules
const express = require('express');
// npm install jsonwebtoken
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const { User, createUser } = require('./models/Users'); // Import the createUser function from users.js
const { Listing, createListing, addDate} = require('./models/Listings');
console.log('Listing Model:', Listing); // This should log the Listing model object
const bcrypt = require('bcrypt');   //encryption thing
const crypto = require('crypto');
const nodemailer = require('nodemailer');



const multer = require('multer');
const path = require('path');
const app = express();
const session = require('express-session');
//const { Listings } = require('./models/Listings');
app.use(session({
    secret: 'your_secret_key',      // A secret key used to sign the session ID cookie
    resave: false,                  // Prevents resaving session data if nothing changed
    saveUninitialized: true,        // Forces uninitialized sessions to be saved
    cookie: { secure: false }       // Set to true in production if using HTTPS
}));
const SECRET_KEY = 'your-secret-key';
const saltRounds = 8;   //the higher this is, the more secure encryption of pw are but the slower process is

// Middleware

app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // Enables parsing of URL-encoded form data
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
  credentials: true
}));
app.use(express.static(path.join(__dirname, '../Frontend/build')));
//added
app.get('/LandingPage', (req, res) => {
  res.sendFile(path.join(__dirname, '../Frontend/src/pages', 'LangingPage.js'));
});



// Multer setup for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });




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

//generate token
function createToken(user) {
  const payload = {
      id: user.id, // Unique user ID from the database
      username: user.username, // Username or email of the user
      role: user.role, // Role (e.g., 'admin', 'user')
  };

  const options = {
      expiresIn: '100h', // Token expiration time
  };

  return jwt.sign(payload, SECRET_KEY, options);
}





// Define routes (if any)
// Example: Simple route to test the server
app.get('/test', (req, res) => {
   res.send('Hello, the server is running!');
});

app.post('/add-user', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;


    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);   // Hash the password before saving

    //Create user
    const newUser = new User({ name, username, email, password: hashedPassword });
    await newUser.save();

    const token = createToken(newUser);
  
    // Respond with the token
    res.json({ message: "User created successfully", token });
    // Send success response
  } catch (error) {
    console.error('Error adding user:', error);
    console.error('Stack Trace:', error.stack);
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
});

app.get('/check-user', async (req, res) => {
  try {
    const { username, password } = req.query;

    // Find user in the database by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Compare the submitted password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT with additional user information
    const token = createToken(user);

    // Respond with the token
    res.json({ message: "User authenticated successfully", token });
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Error checking user' });
  }
});



app.get('/api/username', (req, res) => {
  const authHeader = req.headers.authorization;

  // Check for Authorization header
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    console.log("No or invalid authHeader");
    return res.status(401).json({
      error: 'No token provided or invalid format',
    });
  }

  const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"

  try {
   

    // Verify the token
    const decoded = jwt.verify(token, SECRET_KEY);

    

    // Respond with user info
    res.status(200).json({
      username: decoded.username,

    });
  } catch (error) {
    // Handle invalid or expired token
    console.error('Token verification error:', error.message);
    res.status(401).json({
      isLoggedIn: false,
      error: 'Invalid or expired token',
    });
  }
});




app.post('/reset-passwordProfile', async (req, res) => {
  try {
    const { username, password, password2 } = req.body; // Extract user input from the form
    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "User does not exists" });
    } 

    // Check if the new passwords match
    if (password !== password2) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    // Check if the new password is the same as the current password
    const isPasswordSame = await bcrypt.compare(password, user.password);
    if (isPasswordSame) {
      return res.status(400).json({ error: "Can not use the same password. Please Log In" });
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);   // Hash the password before proceeding

    // Update the password in the database
    await User.updateOne({ username }, { $set: { password: hashedPassword } });
    // Redirect to profile page after successful password reset
    res.status(200).json({ message: "password reset succesfuly", user });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Error' });
  }
});






app.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body; // Extract email from the form input

    console.log(email);

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash the reset token to store it securely
    const hashedToken = await bcrypt.hash(resetToken, saltRounds);

    // Save the hashed token as the user's new password
    user.password = hashedToken;
    user.resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // // Configure nodemailer transporter
    // const transporter = nodemailer.createTransport({
    //   service: 'Gmail',
    //   auth: {
    //     user: 'bpop5273@gmail.com', // Replace with your actual email
    //     pass: 'wmxn jetv yrzn tbij', // Replace with your app password
    //   },
    // });


    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587, // Change to 587
      secure: false, // Set to false for STARTTLS
      auth: {
        user: 'bpop5273@gmail.com',
        pass: 'irua uszy ajpq gkac',
      },
      tls: {
        rejectUnauthorized: false, // Bypass SSL/TLS verification
      },
    });







    // Email options
    const mailOptions = {
      from: 'bpop5273@gmail.com', // Use the sender's email
      to: user.email,             // The recipient's email
      subject: 'Password Reset Request',
      text: `Log in to your account and reset your password from your profile. Your temporary password is: ${resetToken}\n\nThis temporary password will expire in 1 hour. Please log in and update your password immediately.`,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Temporary password sent successfully. Please check your email.' });
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'An error occurred' });
  }
});






app.post('/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    const { username } = req.body; // Use 'username' consistently

    // Validate input
    if (!username) {
      return res.status(400).send('Username is required');
    }

    if (!req.file) {
      return res.status(400).send('Photo file is required');
    }

    const photoBuffer = req.file.buffer;
    const photoContentType = req.file.mimetype;

    // Update the user's photo in the database
    const updateResult = await User.updateOne(
      { username }, // Correct field name
      { $set: { photo: { data: photoBuffer, contentType: photoContentType } } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).send('User not found');
    }

    res.status(200).send('Photo uploaded successfully');
  } catch (error) {
    console.error('Error uploading photo:', error);
    res.status(500).send('Error uploading photo');
  }
});





// Route to handle photo upload
app.get('/check-photo', async (req, res) => {
  try {
    const username = req.session.username; // Assume the user is logged in and has a username
    if (!username) return res.status(401).send('User not logged in');

    const user = await User.findOne({ username });
    if (!user || !user.photo || !user.photo.data) {
      return res.status(404).send('No profile photo found');
    }

    // Convert the photo data to a base64 string
    const base64Image = user.photo.data.toString('base64');
    const photoData = `data:${user.photo.contentType};base64,${base64Image}`;

    res.json({ photo: photoData });
  } catch (error) {
    console.error('Error retrieving photo:', error);
    res.status(500).send('Error retrieving photo');
  }
});

// //Edits the Bio 
// app.post('/editBio', async (req, res) => {
//   try {
//     const {bio} = req.body; // Extract user input from the form
//     const username = req.session.username;
//     req.session.bio = bio;
//     await User.updateOne({ username }, { $set: { bio } });
//     // Redirect to profile page after successful password reset
//     return res.redirect('/profile.html');

//   } catch (error) {
//     console.error('Error updating Bio:', error);
//     res.status(500).send('Error updating Bio');
//   }

// });


app.post('/editBio', async (req, res) => {
  try {
    const { username, bio } = req.body;

    if (!username || !bio) {
      return res.status(400).send("Username and bio are required");
    }

    const updateResult = await User.updateOne(
      { username },
      { $set: { bio } }
    );

    if (updateResult.modifiedCount === 0) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Bio updated successfully");
  } catch (error) {
    console.error("Error updating bio:", error);
    res.status(500).send("Error updating bio");
  }
});











//Returns the Bio that is in the user's document
app.get('/returnBio', async (req, res) => {

  try {
    const username = req.session.username;
    if (!username) {
      return res.status(403).json({ error: 'Unauthorized: Please log in to view bio.' });
    }
    const user = await User.findOne({ username });
    if (user && user.bio) {
      res.json({ bio: user.bio });
    } else {
      res.status(404).json({ error: 'No bio found for this user' });
    }
  } catch (error) {
    console.error('Error getting bio:', error);
    res.status(500).send('Error getting bio');
  }
});

// LISTING FUNCTIONS //


app.post('/add-listing', upload.single('photo'), async (req, res) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Assumes 'Bearer TOKEN'
    if (!token) {
      return res.status(401).send('No token provided');
    }

    // Verify token and extract username
    const decoded = jwt.verify(token, SECRET_KEY); // Replace 'your_jwt_secret' with your actual secret
    const username = decoded.username;
    if (!username) {
      return res.status(401).send('Invalid token: username not found');
    }

    // Proceed with the rest of the code
    const { title, description, price, tags } = req.body; // Listing information
    const photoData = req.file;  // This will contain the uploaded image file

    if (!photoData) {
      return res.status(400).send('No photo uploaded');
    }

    // Verify user exists in database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }

    const tagArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '') : [];

    const newListing = new Listing({
      title,
      description,
      price,
      photo: {
        data: photoData.buffer,  // Store binary data in the database
        contentType: photoData.mimetype,  // Store MIME type
      },
      user: username,
      date: addDate(),
      tags: tagArray,
    });

    await newListing.save();

    res.status(201).send('Listing created successfully');
  } catch (error) {
    console.error('Error creating listing:', error);
    res.status(500).send('Error creating listing');
  }
});





//for frontend to get random listings to show on the frontend
app.get('/random-listings', async (req, res) => {
  try {
    const size = parseInt(req.query.size) || 5;  // Default to 5 if no size is provided
    
    // Validate that the size is a positive integer
    if (isNaN(size) || size <= 0) {
      return res.status(400).send('Invalid size parameter');
    }

    const randomListings = await Listing.aggregate([
      { $sample: { size: size } }  
    ]);

    res.json(randomListings);  // Return the listings as JSON
  } catch (error) {
    console.error('Error fetching random listings:', error);
    res.status(500).send('Error fetching random listings');
  }
});

// Route to fetch all listings
app.get('/get-listings', async (req, res) => {
  try {

    const { tags } = req.query;

    const filter = tags ? { tags: { $all: tags.split(',') } } : {};


    const listings = await Listing.find(filter);

    // Transform the listings to include base64-encoded images
    const transformedListings = listings.map((listing) => {
      let photoData = '';
      if (listing.photo && listing.photo.data) {
        const base64Image = listing.photo.data.toString('base64');
        photoData = `data:${listing.photo.contentType};base64,${base64Image}`;
      }
      return {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        photo: photoData,
        tags: listing.tags, 
      };
    });

    res.json(transformedListings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).send('Error fetching listings');
  }
});


// Route to fetch listings for a specific user
app.get('/getUser-listings', async (req, res) => {
  try {
    // Extract user and tags from query parameters
    const { user, tags } = req.query;

    // Build the filter object
    const filter = {};
    if (user) filter.user = user; // Filter by user
    if (tags) filter.tags = { $in: tags.split(',') }; // Filter by tags (optional)

    // Fetch listings matching the filter
    const listings = await Listing.find(filter);

    // Transform the listings to include base64-encoded images
    const transformedListings = listings.map((listing) => {
      let photoData = '';
      if (listing.photo && listing.photo.data) {
        const base64Image = listing.photo.data.toString('base64');
        photoData = `data:${listing.photo.contentType};base64,${base64Image}`;
      }
      return {
        title: listing.title,
        description: listing.description,
        price: listing.price,
        photo: photoData,
        tags: listing.tags,
        user: listing.user, // Include the user field in the response
      };
    });

    res.json(transformedListings);
  } catch (error) {
    console.error('Error fetching listings:', error);
    res.status(500).send('Error fetching listings');
  }
});



// Fetch attricutes from Image schema
app.get('/fetch-image-attributes', async (req, res) => {
  try {
    const title = req.query.title; // Extract title from query parameters
    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }

    // Find the listing with the specified title
    const listing = await Listing.findOne({ title });
    if (!listing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    // Transform the listing to include a base64-encoded image
    const transformedListing = {
      title: listing.title,
      description: listing.description,
      price: listing.price,
      user: listing.user,
      photo: {
        data: `data:${listing.photo.contentType};base64,${listing.photo.data.toString('base64')}`, // Encode image
        contentType: listing.photo.contentType,
      },
      date: listing.date,
    };

    res.json(transformedListing);
  } catch (error) {
    console.error('Error fetching image attributes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/fetch-user-attributes', async (req, res) => {
  try {
    const title = req.query.title; // Extract title from query parameters
    if (!title) {
      return res.status(400).json({ error: 'Title query parameter is required' });
    }

    // Find the listing with the specified title
    const userInfo = await User.findOne({ username: req.query.title });
    
    if (!userInfo) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Transform the listing to include a base64-encoded image
    const transformedListing = {
      name: userInfo.name,
      username: userInfo.username,
      password: userInfo.password,
      email: userInfo.email,
      bio: userInfo.bio,
      photo: userInfo.photo && userInfo.photo.data
        ? {
            data: `data:${userInfo.photo.contentType};base64,${userInfo.photo.data.toString('base64')}`,
            contentType: userInfo.photo.contentType,
          }
        : null, // Handle missing photo gracefully
    };
    
    
    
    res.json(transformedListing);
  } catch (error) {
    console.error('Error fetching user attributes:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
const PORT = process.env.PORT || 8001; // Use environment variable or default to 8001
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});


module.exports = app;