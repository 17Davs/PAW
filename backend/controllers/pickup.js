const mongoose = require("mongoose");
const Pickup = require("../models/pickup");
const Donation = require("../models/donation");

let pickupcontroller = {};

/* List */
pickupcontroller.list = (req, res) => {
  Pickup.find()
    .exec()
    .then((pickups) => {
      res.render("pickups/main", {
        title: "Pickup Points",
        pickups,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

/* Filter list */
pickupcontroller.list_filter = (req, res) => {
  // get search conditions

  // create object to filter
  Pickup.find()
    .exec()
    .then((pickups) => {
      res.render("pickups/main", {
        title: "Pickup Points",
        pickups,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

/* Create pickup */
pickupcontroller.create = (req, res) => {
  console.log("aqui");
  res.render("pickups/create", { title: "Create Pickup" });
};
pickupcontroller.save = (req, res) => {
  // join the postal code
  const postalCode = req.body.postalCodePart1 + "-" + req.body.postalCodePart2;

  var pickup = new Pickup({
    name: req.body.name,
    address: {
      street: req.body.street,
      city: req.body.city,
      postalCode: postalCode,
    },
    active: true,
  });

  pickup
    .save()
    .then(() => {
      console.log("Successfully created a pickup.");
      res.redirect("/pickups");
    })
    .catch((err) => {
      console.log(err);
      res.render("pickups/create");
    });
};

pickupcontroller.view = (req, res) => {
  var filter = { _id: req.params.id };

  Pickup.findById(filter)
    .exec()
    .then((pickup) => {
      res.render("pickups/view", {
        title: "Pickup Points",
        pickup,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

pickupcontroller.edit = (req, res) => {
  var filter = { _id: req.params.id };

  Pickup.findById(filter)
    .exec()
    .then((pickup) => {
      console.log(pickup);
      res.render("pickups/edit", {
        title: "Edit Pickup",
        pickup,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

pickupcontroller.update = (req, res) => {
  const postalCode = req.body.postalCodePart1 + "-" + req.body.postalCodePart2;
  const active = req.body.active == "active" ? true : false;

  Pickup.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        address: {
          street: req.body.street,
          city: req.body.city,
          postalCode: postalCode,
        },
        active: active,
      },
    },
    { new: true }
  )
    .then((pickup) => {
      res.redirect("/pickups/" + pickup._id);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.render("pickups/edit", {
        title: "Edit Pickup",
        pickup,
      });
    });
};

pickupcontroller.delete = (req, res) => {
  var id = req.params.id;

  Pickup.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/pickups" });
    })
    .catch((err) => {
      console.log(err);
    });
};

pickupcontroller.get_donations = (req, res) => {
  var id = req.params.id;

  Donation.find({ pickupPoint: id })
    .then((donations) => {
      res.json(donations);
    })
    .catch((err) => {
      console.log(err);
    });
};

pickupcontroller.update_status = (req, res) => {
  var id = req.params.id;

  Pickup.findByIdAndUpdate(id, { active: req.body.active }, { new: true })
    .then((result) => {
      res.json({ redirect: "/pickups" });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = pickupcontroller;
