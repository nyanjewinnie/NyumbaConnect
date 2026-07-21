const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ Connected to MongoDB");

    // Check if the admin already exists
    const existingAdmin = await User.findOne({
      email: "admin@nyumbaconnect.com",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists.");
      process.exit();
    }

    // Hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    // Create admin
    const admin = new User({
      fullName: "System Administrator",
      email: "admin@nyumbaconnect.com",
      phone: "0700000000",
      password: hashedPassword,
      role: "Admin",
    });

    await admin.save();

    console.log("🎉 Admin account created successfully!");
    console.log("Email: admin@nyumbaconnect.com");
    console.log("Password: admin123");

    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

createAdmin();