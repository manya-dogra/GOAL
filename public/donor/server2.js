

// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = 3000;

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jyotigautam0109:s9Eq8ZAgbcY3wr78@cluster0.4w9n9uj.mongodb.net/myDatabase1';

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB Atlas'))
    .catch(err => console.error('Failed to connect to MongoDB Atlas', err));

// Define schema for organ donor
// Define schema for the form data
const organReceiverSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    parentsName: String,
    dob: Date,
    age: Number,
    gender: String,
    bloodType: String,
    mobileNumber: String,
    otherContactNumber: String,
    address: String,
    city: String,
    district: String,
    state: String,
    pinCode: String,
    occupation: String,
    aadharNumber: String,
    organNeeded: String,
    currentMedications: String,
    concern: String
});


// Create model based on schema
const OrganReceiver = mongoose.model('OrganReceiver', organReceiverSchema);


// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve registration form
app.get('/receiver', (req, res) => {
    res.sendFile(path.join(__dirname, 'reciever.html'));
});

// Handle form submission
app.post('/submitForm', async (req, res) => {
    try {
        const newOrganReceiver = new OrganReceiver(req.body);
        await newOrganReceiver.save();
        res.status(201).send('Form data saved successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while saving the form data');
    }
});

// Start the server
app.listen(PORT, () => console.log('Server is running on http://localhost:${PORT}'));