var mongoose = require("mongoose");
var Pickup = require("../../models/pickup");

var pickupController = {};

pickupController.getAll = async (req, res, next) => {
  try {
    const pickups = await Pickup.find({ active: true });
    res.json(pickups);
  } catch (err) {
    next(err);
  }
};

pickupController.getOne = (req, res, next) => {
  if (req.pickup) {
    res.json(req.pickup);
  } else {
    res.status(404).send("Pickup not found");
  }
};

pickupController.getById = async function (req, res, next, id) {
  try {
    var pickup = await Pickup.findById(id);
    if (!pickup) {
      return res.status(404).send("Pickup not found");
    }
    req.pickup = pickup;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = pickupController;
