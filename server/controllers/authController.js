const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/User');

// Register User
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      message: 'Please fill all fields',
    });
  }

  // Check if user exists
  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      message: 'User already exists',
    });
  }

  // Hash password
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(password, salt);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(201).json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
};

// Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  // Compare password
  const isMatch = await bcrypt.compare(
    password,
    user.password
  );

  if (!isMatch) {
    return res.status(401).json({
      message: 'Invalid credentials',
    });
  }

  res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    token: generateToken(user.id),
  });
};

// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

module.exports = {
  registerUser,
  loginUser,
};
