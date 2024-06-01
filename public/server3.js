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
const organDonorSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    fatherMotherGuardianName: String,
    dateOfBirth: Date,
    age: Number,
    gender: String,
    bloodType: String,
    mobileNumber: String,
    guardianMobileNumber: String,
    currentResidentialAddress: String,
    landmarkAddress: String,
    city: String,
    district: String,
    state: String,
    pinCode: Number,
    occupation: String,
    identityCard: String,
    identityCardNumber: String,
    organsToDonate: [String],
    reasonToDonate: String,
    agreedToPrivacyPolicy: Boolean
});

// Create model based on schema
const OrganDonor = mongoose.model('OrganDonor', organDonorSchema);

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Serve registration form
app.get('/reg_form', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'reg_form.html'));
});

// Handle form submission
app.post('/regform', async (req, res) => {
    const {
        firstName, lastName, email, fatherMotherGuardianName, dateOfBirth, age, gender,
        bloodType, mobileNumber, guardianMobileNumber, currentResidentialAddress,
        landmarkAddress, city, district, state, pinCode, occupation, identityCard,
        identityCardNumber, organsToDonate, reasonToDonate, agreedToPrivacyPolicy
    } = req.body;
    
    // Create new organ donor instance
    const newDonor = new OrganDonor({
        firstName, lastName, email, fatherMotherGuardianName, dateOfBirth, age, gender,
        bloodType, mobileNumber, guardianMobileNumber, currentResidentialAddress,
        landmarkAddress, city, district, state, pinCode, occupation, identityCard,
        identityCardNumber, organsToDonate, reasonToDonate, agreedToPrivacyPolicy
    });

    try {
        // Save the organ donor data to the database
        await newDonor.save();
        res.status(201).json({ message: 'Form submitted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the server
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
