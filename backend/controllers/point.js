const mongoose = require("mongoose");
const Rule = require("../models/rule");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const conf = require("../jwt_secret/config");
const {
  createToken,
  maxAge,
  handleErrors,
} = require("../public/javascripts/auth");

let pointcontroller = {};

/* List */
pointcontroller.list = (req, res) => {
  Rule.find()
    .exec()
    .then((rules) => {
      res.render("rules/points", {
        title: "Points System",
        rules,
        type: "all",
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

/* Filter list 
pointcontroller.list_filter = (req, res) => {
  // get search conditions
  var type = req.body.type;

  // create object to filter
  var filter = {};
  if (type !== "all") {
    filter.type = type;
  }

  Rule.find(filter)
    .exec()
    .then((rules) => {
      res.render("rules/points", {
        title: "Points System",
        rules,
        type,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};*/

/* Create rule */
pointcontroller.create = (req, res) => {
  res.render("rules/create", { title: "Create Rule" });
};

pointcontroller.save = (req, res) => {
  var rule = new Rule(req.body);

  rule
    .save()
    .then(() => {
      console.log("Successfully created a rule.");
      res.redirect("/points");
    })
    .catch((err) => {
      console.log(err);
      res.render("rules/create");
    });
};

pointcontroller.view = (req, res) => {
  var filter = { _id: req.params.id };

  Rule.findById(filter)
    .exec()
    .then((rule) => {
      res.render("rules/view", {
        title: "Points System",
        rule,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

pointcontroller.edit = (req, res) => {
  var filter = { _id: req.params.id };

  Rule.findById(filter)
    .exec()
    .then((rule) => {
      res.render("rules/edit", {
        title: "Points System",
        rule,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

pointcontroller.update = (req, res) => {
  Rule.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        points: req.body.points,
        type: req.body.type,
        description: req.body.description,
      },
    },
    { new: true }
  )
    .then((rule) => {
      res.redirect("/points/rule/" + rule._id);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.render("rules/edit", {
        title: "Points System",
        rule,
      });
    });
};

pointcontroller.delete = (req, res) => {
  var id = req.params.id;

  Rule.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/points" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = pointcontroller;
