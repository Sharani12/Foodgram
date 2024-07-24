const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Initialize Express
const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from 'public' directory

// Connect to MongoDB
mongoose.connect('mongodb://localhost/foodgram')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a User model
const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String, // In a real app, make sure to hash passwords
});
const User = mongoose.model('User', UserSchema);

// Endpoint to handle account creation
app.post('/create-account', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    // Create new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(200).send('Account created successfully');
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).send('An error occurred');
  }
});

// Endpoint to handle login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send('User not found');
    }

    // Check password (for simplicity; in real applications, compare hashed passwords)
    if (user.password !== password) {
      return res.status(400).send('Incorrect password');
    }

    // Successful login
    res.status(200).send('Login successful');
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).send('An error occurred');
  }
});

// Temporary endpoint to create a user directly
app.get('/create-test-user', async (req, res) => {
  try {
    // Create a test user
    const newUser = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123' // Use plain text password for simplicity; hash it in a real app
    });
    await newUser.save();

    res.send('Test user created successfully');
  } catch (error) {
    console.error('Error creating test user:', error);
    res.status(500).send('An error occurred: ' + error.message);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
