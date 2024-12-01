// backend/app.js

// Import required modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { User, createUser } = require('./models/Users'); // Import the createUser function from users.js
const { Listing, createListing, addDate} = require('./models/Listings');
console.log('Listing Model:', Listing); // This should log the Listing model object

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


// Middleware

app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // Enables parsing of URL-encoded form data
app.use(cors({
  origin: 'http://localhost:3000', // Frontend URL
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


// Define routes (if any)
// Example: Simple route to test the server
app.get('/', (req, res) => {
   res.send('Hello, the server is running!');
});



// // Route to handle form submissions
// app.post('/add-user', async (req, res) => {
//   try {
//     const { name, username, email, password } = req.body; // Extract user input from the form
//     const user = await User.findOne({username});

//     if (user) {
//       res.send(`
//         <script>
//           alert("User already exist.");
//           window.location.href = "/index.html";
//         </script>
//       `);

//     } 
//     else {
//     const newUser = new User({ name, username, email, password });
//     await newUser.save();
//     // res.send('User added successfully!');
//     req.session.username = username;
//     req.session.name = name; 
//    // res.redirect('/profile.html');
//     res.json({ newUser });
//     }

//   } 
//     catch (error) {
//     console.error('Error adding user:', error);
//     res.status(500).send('Error adding user');
//   }

// });


app.post('/add-user', async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password before saving

    const newUser = new User({ name, username, email, password });

    await newUser.save();

    // Save session details
    req.session.username = username;
    req.session.name = name;

    // Send success response
    res.status(201).json({ message: "User added successfully", user: newUser });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'An error occurred while adding the user' });
  }
});








// // Route to check if username and password are correct
// app.get('/check-user', async (req, res) => {
//   try {
//     const { username, password } = req.query; // Extract username and password from query parameters

//     // Find user with matching username and password
//     const user = await User.findOne({ username});
//     const userfind = await User.findOne({ username, password});

//     if (user) {
//       if(userfind){
    
//         req.session.username = username;
//         req.session.name = user.name; 
//         res.redirect('/profile.html');
//       }
//         else {
//           res.send(`
//             <script>
//               alert("Password Invalid");
//               window.location.href = "/Login.html";
//             </script>
//           `);
//         }
//     } 

//     else {

//       res.send(`
//         <script>
//           alert("Invalid Username");
//           window.location.href = "/Login.html";
//         </script>
//       `);

      
//     }
//   } catch (error) {
//     console.error('Error checking user:', error);
//     res.status(500).send('Error checking user');
//   }
// });


app.get('/check-user', async (req, res) => {
  try {
    const { username, password } = req.query; // Extract username and password from query parameters

    // Find user with matching username
    const user = await User.findOne({ username });
    if (user) {
      const userfind = await User.findOne({ username, password }); 

      if (userfind) {
        req.session.username = username;
        req.session.name = user.name;
        return res.status(200).json({ message: "User found successfully", user });
      } else {
        return res.status(400).json({ error: "Password Invalid" });
      }
    } else {
      return res.status(400).json({ error: "Invalid Username" });
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).json({ error: 'Error checking user' });
  }
});



app.post('/reset-password', async (req, res) => {
  try {
    const { username, password, password2 } = req.body; // Extract user input from the form

    // Check if the user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.send(`
        <script>
          alert("User does not exist.");
          window.location.href = "/index.html";
        </script>
      `);
    } 

    // Check if the new passwords match
    if (password !== password2) {
      return res.send(`
        <script>
          alert("Passwords do not match.");
          window.location.href = "/RestartPassword.html";
        </script>
      `);
    }

    // Check if the new password is the same as the current password
    const userWithSamePassword = await User.findOne({ username, password });
    if (userWithSamePassword) {
      return res.send(`
        <script>
          alert("Cannot use the same password. Please login.");
          window.location.href = "/index.html";
        </script>
      `);
    }

    // Update the password in the database
    await User.updateOne({ username }, { $set: { password } });

    // Redirect to profile page after successful password reset
    return res.redirect('/profile.html');

  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).send('Error resetting password');
  }
});


// Create a route to get the username from the session
app.get('/api/username', (req, res) => {
  if (req.session.name) {
      res.json({ name: req.session.name });
  } else {
      res.status(401).json({ error: 'User not logged in' });
  }
});




// Route to handle photo upload
app.post('/upload-photo', upload.single('photo'), async (req, res) => {
  try {
    const username = req.session.username; // Assume the user is logged in and has a username
    if (!username) return res.status(401).send('User not logged in');

    const photoBuffer = req.file.buffer; // Get the photo buffer from multer
    const photoContentType = req.file.mimetype; // Get the MIME type (e.g., image/jpeg)

    // Find the user and update with the photo
    await User.updateOne({ username }, {
      $set: { photo: { data: photoBuffer, contentType: photoContentType } }
    });

    res.send(`
      <script>
      //changes done here
        alert("Photo uploaded successfully!");

        window.location.href = "/profile.html";
      </script>
    `);
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

//Edits the Bio 
app.post('/editBio', async (req, res) => {
  try {
    const {bio} = req.body; // Extract user input from the form
    const username = req.session.username;
    req.session.bio = bio;
    await User.updateOne({ username }, { $set: { bio } });
    // Redirect to profile page after successful password reset
    return res.redirect('/profile.html');

  } catch (error) {
    console.error('Error updating Bio:', error);
    res.status(500).send('Error updating Bio');
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
    const { title, description, price, tags } = req.body; // Listing information
    const photoData = req.file;  // This will contain the uploaded image file
    //change

    if (!photoData) {
      return res.status(400).send('No photo uploaded');
    }

    //using current logged in username from session to link user
    const username = req.session.username;
    if (!username) {
      return res.status(401).send('User not logged in');
    }

    //verify user exists in database
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

    //res.status(201).send('Listing created successfully');
    res.send(`
      <script>
        window.location.href = "/homepage.html";
      </script>
    `);

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