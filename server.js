const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jyotigautam0109:s9Eq8ZAgbcY3wr78@cluster0.4w9n9uj.mongodb.net/myDatabase';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// Connect to MongoDB
//mongoose.connect('mongodb://localhost:27017/login_signup', { useNewUrlParser: true, useUnifiedTopology: true })
  //  .then(() => console.log('Connected to MongoDB'))
  //  .catch(err => console.error('Failed to connect to MongoDB', err));

// Create User model
const User = mongoose.model('User', {
    email: String,
    password: String
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve login.html
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve signup.html
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Serve reg.html
app.get('/reg', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reg.html'));
});


// Signup route
app.post('/reg', async (req, res) => {
    const { email, password } = req.body;
    const user = new User({ email, password });
    try {
        await user.save();
       // res.header('Content-Type', 'text/html');
     //res.send('Signup successful! Redirecting...');
     // Redirect to an external website after successful signup
        res.redirect('/signup');
    } catch (err) {
        res.status(400).send('Signup failed!');
    }
});

// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (user) {
            res.redirect('/project');
        } else {
            res.status(401).send('Invalid email or password');
        }
    } catch (err) {
        res.status(400).send('Login failed!');
    }
});

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Mock user data
// const userData = {
//     name: 'John Doe',
//     email: 'johndoe@example.com',
//     location: 'New York',
//     age: 30
// };
// Endpoint to get user data
app.get('/userData', async (req, res) => {
    try {
        const user = await User.findOne(); // Retrieve the first user
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));