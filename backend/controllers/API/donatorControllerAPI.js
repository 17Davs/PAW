var mongoose = require("mongoose");
var Donator = require("../../models/donator");
var Donation = require("../../models/donation");
var Rule = require("../../models/rule");

var donatorController = {};

donatorController.getAll = async (req, res, next) => {
  try {
    const donators = await Donator.find();
    res.json(donators);
  } catch (err) {
    next(err);
  }
};

donatorController.getOne = (req, res, next) => {
  if (req.donator) {
    res.json(req.donator);
  } else {
    res.status(404).send("Donator not found");
  }
};

donatorController.createDonator = (req, res, next) => {
  var donator = new Donator(req.body);

  donator.save((err) => {
    if (err) {
      next(err);
    } else {
      res.json(donator);
    }
  });
};

donatorController.editDonator = (req, res, next) => {
  Donator.findByIdAndUpdate(
    req.body._id,
    req.body,
    { new: true },
    (err, donator) => {
      if (err) {
        next(err);
      } else {
        res.json(donator);
      }
    }
  );
};

donatorController.deleteDonator = (req, res, next) => {
  /* Donator.findByIdAndDelete(req.body._id); */

  req.donator.remove((err) => {
    if (err) {
      next(err);
    } else {
      res.json(req.donator);
    }
  });
};

donatorController.getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ donor: req.donator._id })
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("pickupPoint")
      .populate("receivingEntity")
      //.populate("photoProof.by");
      .populate("status");
    res.json(donations);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

donatorController.convertPoints = async (req, res, next) => {
  try {
    const qtd = parseInt(req.params.qtd, 0);

    if (isNaN(qtd) || qtd <= 0) {
      return res.status(400).send("Invalid quantity");
    }

    const donator = req.donator;

    if (donator.points < qtd) {
      return res.status(400).send("Insufficient points");
    }

    // get pointsConversion rule
    const rule = await Rule.findOne({ type: "pointsConversion" });

    // verify rule
    if (!rule) {
      return res.status(500).send("Conversion rule not found");
    }

    // points to euro
    const pointsPerEuro = rule.points;

    // credits to add
    const creditsToAdd = Math.floor(qtd / pointsPerEuro);

    donator.points -= qtd;
    donator.credit += creditsToAdd;

    await donator.save();

    res.json(donator);
  } catch (err) {
    next(err);
  }
};

donatorController.getById = async function (req, res, next, id) {
  try {
    var donator = await Donator.findById(id);
    if (!donator) {
      return res.status(404).send("Donator not found");
    }
    req.donator = donator;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = donatorController;
