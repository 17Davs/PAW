const mongoose = require("mongoose");
const User = require("../models/user");
const Donator = require("../models/donator");
const Entity = require("../models/entity");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const conf = require("../jwt_secret/config");
const {
  createToken,
  maxAge,
  handleErrors,
} = require("../public/javascripts/auth");

let usercontroller = {};

/* Entities */

/* Employees */
usercontroller.employees_get = (req, res, next) => {
  // Save all employees to local
  User.find()
    .then((result) => {
      res.render("user/people/employees/employees", {
        title: "Employees",
        employees: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

usercontroller.stat_post = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body).then((result) => {
    res.json({ redirect: "/user/employees/" });
  });
};

usercontroller.edit_get = (req, res, next) => {
  const id = req.params.id;

  User.findById(id)
    .then((result) => {
      res.render("user/people/employees/edit", {
        title: "Edit Entity",
        employee: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

usercontroller.edit_post = (req, res, next) => {
  const id = req.params.id;

  User.findByIdAndUpdate(id, req.body).then((result) => {
    res.redirect("/user/employees/");
  });
};

/* Donators */
usercontroller.donators_get = (req, res, next) => {
  // Save all employees to local
  Donator.find()
    .then((result) => {
      res.render("user/people/donators/donators", {
        title: "Donators",
        donators: result,
      });
    })
    .catch((err) => {
      console.log(err);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = usercontroller;
