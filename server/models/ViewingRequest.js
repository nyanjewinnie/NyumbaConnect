const mongoose = require("mongoose");

const viewingRequestSchema = new mongoose.Schema(
  {
    tenant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    property: {
      type: String,
      required: true,
    },

    date: {
      type: String,
      required: true,
    },

    message: {
      type: String,
    },

    status: {
      type: String,
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "ViewingRequest",
  viewingRequestSchema
);