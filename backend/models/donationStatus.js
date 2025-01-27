const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema for donation status
const donationStatusSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const DonationStatus = mongoose.model("DonationStatus", donationStatusSchema);

module.exports = DonationStatus;
