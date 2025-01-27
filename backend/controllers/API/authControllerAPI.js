var mongoose = require("mongoose");
var Donator = require("../../models/donator");
var Entity = require("../../models/entity");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const conf = require("../../jwt_secret/config");

var authController = {};

// DONATORS

// Login function for Donator
authController.loginDonator = async function (req, res) {
  try {
    var donator = await Donator.findOne({ email: req.body.email });
    if (!donator) return res.status(404).send("No donator found.");

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, donator.pass);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    // if donator is found and password is valid, create a token
    var token = jwt.sign({ id: donator._id, userType: "donor" }, conf.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token and user type and userId as JSON
    res.status(200).send({
      auth: true,
      token: token,
      userType: "donor",
      userId: donator._id,
    });
  } catch (err) {
    console.error("Error on the server:", err); // Adicionado para logar o erro

    res.status(500).send("Error on the server.");
  }
};

// Register function for Donator
authController.registerDonator = async function (req, res) {
  try {
    // Check if the email already exists
    var existingDonator = await Donator.findOne({ email: req.body.email });
    if (existingDonator) return res.status(400).send("Email already exists.");

    // Create a new donator
    var newDonator = new Donator(req.body);
    await newDonator.save();

    // Create and return token
    var token = jwt.sign(
      { id: newDonator._id, userType: "donor" },
      conf.secret,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );

    // Return token and user type as JSON
    res.status(200).send({
      auth: true,
      token: token,
      userType: "donor",
      userId: newDonator._id,
    });
  } catch (err) {
    res.status(500).send("Error on the server." + err);
  }
};

// Logout function for Donator
authController.logoutDonator = async function (req, res) {
  try {
    // Assuming a token is used for authentication, no action is required for logout.
    res.status(200).send({ auth: false, token: null });
  } catch (err) {
    res.status(500).send("Error on the server.");
  }
};

// ENTIDADES

// Login function for Entity
authController.loginEntity = async function (req, res) {
  try {
    var entity = await Entity.findOne({ email: req.body.email });
    if (!entity) return res.status(404).send("No entity found.");

    // check if the password is valid
    var passwordIsValid = bcrypt.compareSync(req.body.password, entity.pass);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    // if entidade is found and password is valid, create a token
    var token = jwt.sign({ id: entity._id, userType: "entity" }, conf.secret, {
      expiresIn: 86400, // expires in 24 hours
    });

    // return the information including token and user type as JSON
    res.status(200).send({
      auth: true,
      token: token,
      userType: "entity",
      userId: entity._id,
    });
  } catch (err) {
    res.status(500).send("Error on the server.");
  }
};

// Register function for Entity
authController.registerEntity = async function (req, res) {
  try {
    // Check if the email already exists
    var existingEntity = await Entity.findOne({ email: req.body.email });
    if (existingEntity) return res.status(400).send("Email already exists.");

    // Create a new Entity
    var newEntity = new Entity(req.body);
    await newEntity.save();

    // Create and return token
    var token = jwt.sign(
      { id: newEntity._id, userType: "entity" },
      conf.secret,
      {
        expiresIn: 86400, // expires in 24 hours
      }
    );

    // Return token and user type as JSON
    res.status(200).send({
      auth: true,
      token: token,
      userType: "entity",
      userId: newEntity._id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error on the server.");
  }
};

// Logout function for Entity
authController.logoutEntity = async function (req, res) {
  try {
    // Assuming a token is used for authentication, no action is required for logout.
    res.status(200).send({ auth: false, token: null });
  } catch (err) {
    res.status(500).send("Error on the server.");
  }
};

// Middleware to verify token
authController.verifyToken = function (req, res, next) {
  var token = req.headers["x-access-token"];
  if (!token)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, conf.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });
    req.userId = decoded.id;
    req.userType = decoded.userType; // Adding userType to the request
    next();
  });
};

// Middleware to verify if the user is donor
authController.verifyRoleDonor = async function (req, res, next) {
  try {
    if (req.userType !== "donor") {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }

    var user = await Donator.findById(req.userId);
    if (!user) return res.status(404).send("No user found.");

    next();
  } catch (err) {
    res.status(500).send("There was a problem finding the user.");
  }
};

// Middleware to verify if the user is entity
authController.verifyRoleEntity = async function (req, res, next) {
  try {
    if (req.userType !== "entity") {
      return res.status(403).send({ auth: false, message: "Not authorized!" });
    }

    var user = await Entity.findById(req.userId);
    if (!user) return res.status(404).send("No user found.");

    next();
  } catch (err) {
    res.status(500).send("There was a problem finding the user.");
  }
};

module.exports = authController;
