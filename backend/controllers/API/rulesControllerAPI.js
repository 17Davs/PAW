var mongoose = require("mongoose");
var Rule = require("../../models/rule");

var rulesController = {};

rulesController.getAll = async (req, res, next) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (err) {
    next(err);
  }
};

rulesController.getOne = (req, res, next) => {
  if (req.rule) {
    res.json(req.rule);
  } else {
    res.status(404).send("Rule not found");
  }
};

rulesController.getById = async function (req, res, next, id) {
  try {
    var rule = await Rule.findById(id);
    if (!rule) {
      return res.status(404).send("Rule not found");
    }
    req.rule = rule;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = rulesController;
