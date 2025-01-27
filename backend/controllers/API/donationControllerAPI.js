var mongoose = require("mongoose");
var Donation = require("../../models/donation");

var donationController = {};

donationController.createDonation = async (req, res, next) => {
  try {
    console.log(req.body);
    const donation = new Donation(req.body);
    await donation.save();
    res.json(donation);
  } catch (err) {
    next(err);
  }
};

donationController.getAll = async (req, res, next) => {
  try {
    const donations = await Donation.find()
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("pickupPoint")
      .populate("receivingEntity")
      .populate("photoProof.by")
      .populate("status");

    res.json(donations);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

donationController.getOne = (req, res, next) => {
  if (req.donation) {
    res.json(req.donation);
  } else {
    res.status(404).send("Donation not found");
  }
};

donationController.getById = async function (req, res, next, id) {
  try {
    var donation = await Donation.findById(id);
    if (!donation) {
      return res.status(404).send("Donation not found");
    }
    donation
      .populate("donor")
      .populate("pickupPoint")
      .populate("receivingEntity")
      .populate("photoProof.by")
      .populate("status");
    req.donation = donation;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = donationController;
