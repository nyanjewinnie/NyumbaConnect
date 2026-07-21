const dns = require("dns");
dns.setDefaultResultOrder("ipv4first");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const houseRoutes = require("./routes/houseRoutes");
const viewingRequestRoutes = require("./routes/viewingRequestRoutes");
const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Test Routes
app.get("/", (req, res) => {
  res.send("NyumbaConnect Backend API - UPDATED TEST");
});

app.get("/test", (req, res) => {
  res.send("Main server test working");
});

// API Routes
app.use("/api/houses", houseRoutes);
app.use("/api/viewing-requests", viewingRequestRoutes);
app.use("/api/users", userRoutes);

// Connect to MongoDB
async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");

    await mongoose.connect(process.env.MONGO_URI);

    console.log("✅ MongoDB Connected");
    console.log("Database:", mongoose.connection.name);
    console.log("Host:", mongoose.connection.host);
    console.log("Ready State:", mongoose.connection.readyState);

  } catch (error) {
    console.log("❌ Full MongoDB Error:");
    console.error(error);
    process.exit(1);
  }
}

connectDB();

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});