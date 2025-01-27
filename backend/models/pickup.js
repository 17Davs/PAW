const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const pickupSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
        match: /^\d{4}-\d{3}$/,
      },
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Pickup = mongoose.model("Pickup", pickupSchema);
module.exports = Pickup;
