const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require("cors")
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const path = require('path');  // Required to serve HTML files

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true })); // To handle form data
app.use(express.static('public'));  // Serve static files from 'public' folder
app.use(cors())

// MongoDB connection
mongoose.connect('mongodb+srv://suyashjain:admin@cluster0.yc6fe.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// User schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Routes

// Serve homepage
app.get('/', (req, res) => {
    console.log('Serving homepage');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve login page
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Serve signup page
app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));
});

// Signup route
app.post('/signup', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ msg: 'Passwords do not match' });
    }

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // Hash the password and save the user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        // Redirect to login page after successful signup
        //res.status(201).json({ msg: 'User registered successfully. Redirecting to login...', redirect: '/login' });
        res.redirect('http://localhost:3000/login');  
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Server error' });
    }
});


// Login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password)
    
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ msg: 'User not found. Please sign up first.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, 'secretKey', { expiresIn: '1h' });

    res.json({ token, msg: 'Login successful, redirecting...', redirect: 'http://localhost:9000' });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));