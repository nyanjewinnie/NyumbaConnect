const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    county: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },

    sublocation: {
  type: String,
  required: true,
},

    rent: {
      type: Number,
      required: true,
    },

    deposit: {
      type: Number,
      required: true,
    },

    landlord: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    mapLink: {
  type: String,
  default: "",
},

    status: {
      type: String,
      default: "Available",
    },

    images: [
      {
        type: String,
      },
    ],

    amenities: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("House", houseSchema);