const express = require("express");
const ViewingRequest = require("../models/ViewingRequest");

const router = express.Router();

// ================= GET ALL VIEWING REQUESTS =================
router.get("/", async (req, res) => {
  try {
    const requests = await ViewingRequest.find().sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= CREATE VIEWING REQUEST =================
router.post("/", async (req, res) => {
  try {
    const {
      tenant,
      name,
      phone,
      property,
      date,
      message,
      status,
    } = req.body;

    const request = new ViewingRequest({
      tenant,
      name,
      phone,
      property,
      date,
      message,
      status,
    });

    const savedRequest = await request.save();

    res.status(201).json(savedRequest);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= UPDATE STATUS =================
router.put("/:id", async (req, res) => {
  try {
    const updatedRequest =
      await ViewingRequest.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.status(200).json(updatedRequest);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// ================= DELETE =================
router.delete("/:id", async (req, res) => {
  try {
    await ViewingRequest.findByIdAndDelete(req.params.id);

    res.json({
      message: "Viewing request deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;