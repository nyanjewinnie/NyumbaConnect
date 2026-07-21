const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER USER =================
const registerUser = async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const user = await User.create({
      fullName,
      email,
      phone,
      password: hashedPassword,
      role,
    });

    res.status(201).json({
      message: "Registration successful",
      user,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ================= LOGIN USER =================
const loginUser = async (req, res) => {
  res.json({
    message: "Login route coming next...",
  });
};

module.exports = {
  registerUser,
  loginUser,
};