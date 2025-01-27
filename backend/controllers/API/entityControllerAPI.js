var mongoose = require("mongoose");
var Entity = require("../../models/entity");
var Donation = require("../../models/donation");

var entityController = {};

entityController.getAll = async (req, res, next) => {
  try {
    const entities = await Entity.find({ active: true });
    res.json(entities);
  } catch (err) {
    next(err);
  }
};

entityController.getOne = async (req, res, next) => {
  try {
    if (req.entity) {
      res.json(req.entity);
    } else {
      res.status(404).send("Entity not found");
    }
  } catch (err) {
    next(err);
  }
};

entityController.createEntity = async (req, res, next) => {
  try {
    var entity = new Entity(req.body);
    await entity.save();
    res.json(entity);
  } catch (err) {
    next(err);
  }
};

entityController.editEntity = async (req, res, next) => {
  try {
    var updatedEntity = await Entity.findByIdAndUpdate(req.body._id, req.body, {
      new: true,
    });
    res.json(updatedEntity);
  } catch (err) {
    next(err);
  }
};

entityController.deleteEntity = async (req, res, next) => {
  try {
    await req.entity.remove();
    res.json(req.entity);
  } catch (err) {
    next(err);
  }
};

entityController.getDonations = async (req, res, next) => {
  try {
    const donations = await Donation.find({ receivingEntity: req.entity._id })
      .sort({ createdAt: -1 })
      .populate("donor")
      .populate("pickupPoint")
      .populate("receivingEntity")
      .populate("status");

    res.json(donations);
  } catch (err) {
    next(err);
  }
};

entityController.getById = async function (req, res, next, id) {
  try {
    var entity = await Entity.findById(id);
    if (!entity) {
      return res.status(404).send("Entity not found");
    }
    req.entity = entity;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = entityController;
