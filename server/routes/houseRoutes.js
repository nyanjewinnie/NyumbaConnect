
const express = require("express");
const mongoose = require("mongoose");
const House = require("../models/House");

const router = express.Router();

console.log("House routes loaded");

// Test route
router.get("/test", (req, res) => {
  res.send("House route is working");
});

// Add a new house
router.post("/", async (req, res) => {
  console.log("POST /api/houses");
  console.log("Ready State:", mongoose.connection.readyState);
  console.log("Database:", mongoose.connection.name);
  console.log("Request Body:", req.body);

  try {
    const newHouse = new House(req.body);

    const savedHouse = await newHouse.save();

    console.log("✅ House saved successfully");

    res.status(201).json(savedHouse);
  } catch (error) {
    console.error("POST Error:");
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Get all houses
router.get("/", async (req, res) => {
  console.log("========== GET /api/houses ==========");
  console.log("Mongo Ready State:", require("mongoose").connection.readyState);
  console.log("Database:", require("mongoose").connection.name);

  try {
    const houses = await House.find({});

    console.log("SUCCESS! Houses found:", houses.length);

    res.status(200).json(houses);
  } catch (error) {
    console.log("========== FULL ERROR ==========");
    console.error(error);
    console.error(error.stack);

    res.status(500).json({
      message: error.message,
      name: error.name,
    });
  }
});

// Update a house
router.put("/:id", async (req, res) => {
  console.log("PUT /api/houses/:id");

  try {
    const updatedHouse = await House.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedHouse) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    console.log("✅ House updated successfully");

    res.status(200).json(updatedHouse);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// Delete a house
router.delete("/:id", async (req, res) => {
  console.log("DELETE /api/houses/:id");

  try {
    const deletedHouse = await House.findByIdAndDelete(req.params.id);

    if (!deletedHouse) {
      return res.status(404).json({
        message: "House not found",
      });
    }

    console.log("✅ House deleted successfully");

    res.status(200).json({
      message: "House deleted successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;