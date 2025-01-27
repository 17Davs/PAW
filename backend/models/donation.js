const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for donation
const donationSchema = new Schema(
  {
    donor: {
      type: Schema.Types.ObjectId,
      ref: "donator",
      required: true,
    },
    points: {
      type: Number,
      required: true,
      default: 0,
    },
    pickupPoint: {
      type: Schema.Types.ObjectId,
      ref: "Pickup",
    },
    receivingEntity: {
      type: Schema.Types.ObjectId,
      ref: "Entity",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    status: {
      type: Schema.Types.ObjectId,
      ref: "DonationStatus",
      required: true,
      default: "6633e72dea92f889a918f01d", // ObjectId for "waiting_pickup"
    },
    photoProof: {
      image: {
        type: String,
      },
      by: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
      date: {
        type: Date,
      },
    },
  },
  { timestamps: true }
);

const Donation = mongoose.model("Donation", donationSchema);
module.exports = Donation;
