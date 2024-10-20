const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true }
});

// Create the user model
const userModel = mongoose.model('User', userSchema);

// Export the model
module.exports = userModel;
