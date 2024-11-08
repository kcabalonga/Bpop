// backend/app.js

// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const { User, createUser } = require('./models/Users'); // Import the createUser function from users.js
//const cors = require('cors'); // Optional: If you have a frontend making requests
const path = require('path');
// Initialize Express app
const app = express();

// Middleware

app.use(express.static(path.join(__dirname, '../Frontend/public')));
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // Enables parsing of URL-encoded form data
//app.use(cors()); // Optional: Enable CORS if accessing from frontend

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



// Route to handle form submissions
app.post('/add-user', async (req, res) => {

  try {
    const { name, username, email, password } = req.body; // Extract user input from the form
    const user = await User.findOne({username});

    if (user) {
      res.send(`
        <script>
          alert("User already exist.");
          window.location.href = "/index.html";
        </script>
      `);

    } 
    
    else {
    const newUser = new User({ name, username, email, password });
    await newUser.save();
    // res.send('User added successfully!');
    res.redirect('/profile.html');
    }

  } 
  
    catch (error) {
    console.error('Error adding user:', error);
    res.status(500).send('Error adding user');
  }

});




// Route to check if username and password are correct
app.get('/check-user', async (req, res) => {
  try {
    const { username, password } = req.query; // Extract username and password from query parameters

    // Find user with matching username and password
    const user = await User.findOne({ username});
    const userfind = await User.findOne({ username, password});

    if (user) {
      if(userfind){
        res.redirect('/profile.html');
      }
        else {
          

          res.send(`
            <script>
              alert("Password Invalid");
              window.location.href = "/Login.html";
            </script>
          `);
        }
    } 

    else {

      res.send(`
        <script>
          alert("Invalid Username");
          window.location.href = "/Login.html";
        </script>
      `);

      
    }
  } catch (error) {
    console.error('Error checking user:', error);
    res.status(500).send('Error checking user');
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





// Start the server
const PORT = process.env.PORT || 3000; // Use environment variable or default to 3000
app.listen(PORT, () => {
  console.log(`🚀 Backend server is running on http://localhost:${PORT}`);
});