// Import and require bcrypt
const bcrypt = require('bcrypt')

// Import and rquire jsonwebtoken
const jwt = require('jsonwebtoken')

// Make a User from the User Model
const User = require('../models/userModel')

// Create function to make a Token
function generateToken(user) {
    const payload = { id: user._id, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '3d'});
    return token;
}

// Create async function to Register a new User
async function register (req, res) {
    try {
        // Check if there's an existing user
        const foundUser = await User.findOne({ username: req.body.username })

        // if there is a result
        if (foundUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        // If there is no result, encrypt provided password
        const encryptedPassword = await bcrypt.hash(
            req.body.password,
            Number(process.env.SALT_ROUNDS)
        );

        // Add the new user to DB with encrypted password
        const newUser = await User.create({
            ...req.body,
            password: encryptedPassword,
        });

        // Generate JWT Token and return to new user
        const token = generateToken(newUser);

        res.status(200).json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
}

// Create async Login function for existing users
async function login (req, res) {
    try {
        // Check for existing user
        const foundUser = await User.findOne({ username: req.body.username });

        // if no result then
        if (!foundUser) {
            return res.status(404).json({ error: 'No such user exists' });
        }

        // Check if provided password matches stored value in DB
        const validPass = await bcrypt.compare(
            req.body.password,
            foundUser.password
        );

        // if password does not match then 
        if (!validPass) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Generate JWT Token and return to the user
        const token = generateToken(foundUser);

        res.status(200).json({ token });
    } catch (err) {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    }
}

// Export the module
module.exports = {
    register,
    login,
};