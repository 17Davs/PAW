const mongoose = require("mongoose");
const Donator = require("../models/donator");
const User = require("../models/user");
const DonationStatus = require("../models/donationStatus");
const Pickup = require("../models/pickup");
const Entity = require("../models/entity");
const Rule = require("../models/rule");
const Donation = require("../models/donation");

let dashboardController = {};

/* List Donations */
dashboardController.show = async (req, res) => {
  try {
    let entities = await Entity.find({ active: true }).exec();
    let donors = await Donator.find().exec();
    let pickups = await Pickup.find().exec();
    let rules = await Rule.find().exec();
    let users = await User.find().exec();

    let donations = await Donation.find()
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("pickupPoint")
      .populate("receivingEntity")
      .populate("photoProof.by")
      .populate("status")
      .exec();

    res.render("dashboard/index", {
      title: "Dashboard",
      donations,
      donors,
      entities,
      pickups,
      rules,
      users,
    });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = dashboardController;
