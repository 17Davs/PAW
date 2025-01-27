const mongoose = require("mongoose");
const Donators = require("../models/donator");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const conf = require("../jwt_secret/config");
const {
  createToken,
  maxAge,
  handleErrors,
} = require("../public/javascripts/auth");

let donatorscontroller = {};

donatorscontroller.donators_get = (req, res, next) => {
  // Save all donators to local
  Donators.find()
    .then((result) => {
      res.render("user/people/donators/donators", {
        title: "Donators",
        donators: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

donatorscontroller.donator_get = (req, res, next) => {
  const id = req.params.id;

  Donators.findById(id)
    .then((result) => {
      res.render("user/people/donators/details", {
        title: "Donators",
        donator: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

donatorscontroller.update_get = (req, res, next) => {
  const id = req.params.id;

  Donators.findById(id)
    .then((result) => {
      res.render("user/people/donators/edit", {
        title: "Edit Donators",
        donator: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

donatorscontroller.update_post = (req, res, next) => {
  const id = req.params.id;

  Donators.findByIdAndUpdate(id, req.body).then((result) => {
    res.redirect("/user/donators/" + id);
  });
};

donatorscontroller.create_get = (req, res, next) => {
  res.render("user/people/donators/create", { title: "Create Donators" });
};

donatorscontroller.create_post = (req, res, next) => {
  const { name, email, password } = req.body;

  const donator = new Donators({
    name,
    email,
    pass: password,
  });

  donator.save();
  res.redirect("/user/donators");
};

donatorscontroller.stat_post = (req, res, next) => {
  const id = req.params.id;

  Donators.findByIdAndUpdate(id, req.body).then((result) => {
    res.json({ redirect: "/user/donators" });
  });
};

module.exports = donatorscontroller;
