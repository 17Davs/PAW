const mongoose = require("mongoose");
const Entity = require("../models/entity");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const conf = require("../jwt_secret/config");
const {
  createToken,
  maxAge,
  handleErrors,
} = require("../public/javascripts/auth");

let entitiescontroller = {};

entitiescontroller.entities_get = (req, res, next) => {
  // Save all entities to local
  Entity.find()
    .then((result) => {
      res.render("user/people/entities/entities", {
        title: "Entities",
        entities: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

entitiescontroller.entity_get = (req, res, next) => {
  const id = req.params.id;

  Entity.findById(id)
    .then((result) => {
      res.render("user/people/entities/details", {
        title: "Entity",
        entity: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

entitiescontroller.update_get = (req, res, next) => {
  const id = req.params.id;

  Entity.findById(id)
    .then((result) => {
      res.render("user/people/entities/edit", {
        title: "Edit Entity",
        entity: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

entitiescontroller.update_post = (req, res, next) => {
  const id = req.params.id;

  Entity.findByIdAndUpdate(id, req.body).then((result) => {
    res.redirect("/user/entities/" + id);
  });
};

entitiescontroller.create_get = (req, res, next) => {
  res.render("user/people/entities/create", { title: "Create Entity" });
};

entitiescontroller.create_post = (req, res, next) => {
  const { name, email, description, image } = req.body;

  const entity = new Entity({
    name,
    email,
    description,
    image,
  });

  entity.save();
  res.redirect("/user/entities");
};

module.exports = entitiescontroller;
