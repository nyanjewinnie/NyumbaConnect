const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already registered.",
      });
    }

    // Hash password
const hashedPassword = await bcrypt.hash(password, 10);

const newUser = new User({
  fullName,
  email,
  phone,
  password: hashedPassword,
  role,
});

    const savedUser = await newUser.save();

    res.status(201).json({
  message: "Registration successful",
  user: savedUser,
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

const isMatch = await bcrypt.compare(password, user.password);

if (!isMatch) {
  return res.status(401).json({
    message: "Incorrect password.",
  });
}

const token = jwt.sign(
  {
    id: user._id,
    role: user.role,
  },
  process.env.JWT_SECRET || "nyumbaconnectsecret",
  {
    expiresIn: "7d",
  }
);

    res.status(200).json({
  message: "Login successful",
  token,
  role: user.role,
  user: {
    _id: user._id,
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    role: user.role,
},
});

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= GET ALL USERS =================
router.get("/", async (req, res) => {
  try {
    const users = await User.find().select("-password");

    res.status(200).json(users);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= DELETE USER =================
router.delete("/:id", async (req, res) => {
  try {

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    // Prevent deleting Admin accounts
    if (user.role === "Admin") {
      return res.status(403).json({
        message: "Administrator account cannot be deleted.",
      });
    }

    await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;