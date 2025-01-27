const mongoose = require("mongoose");
const Donator = require("../models/donator");
const DonationStatus = require("../models/donationStatus");
const Pickup = require("../models/pickup");
const Entity = require("../models/entity");
const Rule = require("../models/rule");
const Donation = require("../models/donation");
const upload = require("../middleware/uploadMiddleware");

let donationcontroller = {};

/* List Donations */
donationcontroller.list = (req, res) => {
  Donation.find()
    .sort({ createdAt: -1 })
    .populate("donor") // Populate with donator data
    .populate("status") // Populate  with donation status data
    .exec()
    .then((donations) => {
      res.render("donations/main", {
        title: "Donations List",
        donations,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
/* Create donation */
donationcontroller.create = (req, res) => {
  let entities, donors, pickups;

  // find active entities
  Entity.find({ active: true })
    .exec()
    .then((resultEntities) => {
      entities = resultEntities;

      // find donors
      return Donator.find({ active: true }).exec();
    })
    .then((resultDonators) => {
      donors = resultDonators;

      // find active pickups
      return Pickup.find({ active: true }).exec();
    })
    .then((resultPickups) => {
      pickups = resultPickups;

      // render with the data found
      res.render("donations/create", {
        title: "Create Donation",
        entities,
        donors,
        pickups,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send("Internal Server Error");
    });
};
/* Save donation */
donationcontroller.save = (req, res) => {
  // Extract from body
  const { donor, entity, pickup, quantity, weight } = req.body;
  //default status
  const status = "6633e72dea92f889a918f01d";

  //calculate points
  let totalPoints = 0;
  // get rules of point system
  Rule.find()
    .then((rules) => {
      // each rule
      rules.forEach((rule) => {
        // if criteria is KG, multiply for weight of donation and add to the sum
        if (rule.criteria === "kg") {
          totalPoints += weight * rule.points;
        }
        // if criteria is Item, multiply for weight of donation and add to the sum
        else if (rule.criteria === "item") {
          totalPoints += quantity * rule.points;
        }
      });

      // create donation
      const donation = new Donation({
        donor: donor,
        receivingEntity: entity,
        pickupPoint: pickup,
        quantity: quantity,
        weight: weight,
        points: totalPoints,
        status: status,
      });

      // save
      return donation.save();
    })
    .then((donation) => {
      console.log("Successfully created a donation.");
      res.redirect("/donations/" + donation._id);
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/donations/create");
    });
};
/* Donations details - view */
donationcontroller.view = (req, res) => {
  var filter = { _id: req.params.id };

  //find status active
  DonationStatus.find({ active: true })
    .exec()
    .then((statusList) => {
      // find donation
      Donation.findById(filter)
        .populate("donor")
        .populate("pickupPoint")
        .populate("receivingEntity")
        .populate("photoProof.by")
        .populate("status")
        .exec()
        .then((donation) => {
          res.render("donations/view", {
            title: "Donation Details",
            donation,
            statusList,
          });
        })
        .catch((err) => {
          console.log("Error: ", err);
          res.status(500).send("Internal Server Error");
        });
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send("Internal Server Error");
    });
};
/*update donation */
donationcontroller.update = (req, res) => {
  Donation.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        status: req.body.status,
      },
    },
    { new: true }
  )
    .then((donation) => {
      res.redirect("/donations/" + donation._id);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.render("donations/edit", {
        title: "Edit Donation",
        donation,
      });
    });
};
/** Upload Photo Proove, Update status and add points to donor */
donationcontroller.upload_image = (req, res) => {
  var verified = "6633e74aea92f889a918f027";

  // Use middleware upload
  upload.single("image")(req, res, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error uploading image.");
    }

    // verify if there is an image in the req
    if (!req.file) {
      return res.status(400).send("No image uploaded.");
    }
    // update donation with file path of the uploaded image
    Donation.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          "photoProof.image": "/images/" + req.file.filename,
          "photoProof.by": req.body.employee,
          "photoProof.date": Date.now(),
          status: verified, //update status to verified
        },
      },
      { new: true }
    )
      .then((donation) => {
        if (!donation) {
          return res.status(404).send("Donation not found.");
        }

        // Incrementar os pontos do doador
        Donator.findByIdAndUpdate(donation.donor, {
          $inc: { points: donation.points },
        })
          .then(() => {
            res.json({ redirect: "/donations/" + donation._id });
          })
          .catch((err) => {
            console.error("Error updating donor points:", err);
            res.status(500).send("Internal Server Error");
          });
      })
      .catch((err) => {
        console.error("Error updating donation:", err);
        res.status(500).send("Internal Server Error");
      });
  });
};

//status part --------------------------------------------------------------------------------
donationcontroller.status_list = (req, res) => {
  DonationStatus.find()
    .sort({ active: -1 })
    .exec()
    .then((status) => {
      res.render("donations/status/index", {
        title: "Status List",
        status,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};
/* Create status */
donationcontroller.status_create = (req, res) => {
  res.render("donations/status/create", { title: "Create Status" });
};
donationcontroller.status_save = (req, res) => {
  var status = new DonationStatus({
    name: req.body.name,
    active: true,
  });

  status
    .save()
    .then(() => {
      console.log("Successfully created a new status.");
      res.redirect("/donations/status");
    })
    .catch((err) => {
      console.log(err);
      res.render("donations/status/create");
    });
};
/* edit status */
donationcontroller.status_edit = (req, res) => {
  var id = req.params.id;

  DonationStatus.findById(id)
    .exec()
    .then((status) => {
      res.render("donations/status/edit", {
        title: "Edit Status",
        status,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};

donationcontroller.status_delete = (req, res) => {
  var id = req.params.id;

  DonationStatus.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/donations/status" });
    })
    .catch((err) => {
      console.log(err);
    });
};
//verify if status has donations associated
donationcontroller.check_status = (req, res) => {
  var id = req.params.id;

  Donation.find({ status: id })
    .then((donations) => {
      res.json(donations);
    })
    .catch((err) => {
      console.log(err);
    });
};

donationcontroller.status_update = (req, res) => {
  var id = req.params.id;

  const active = req.body.active == "active" ? true : false;

  DonationStatus.findByIdAndUpdate(id, { active: active }, { new: true })
    .then((status) => {
      res.redirect("/donations/status");
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.redirect("/donations/status/" + id);
    });
};

donationcontroller.status_put = (req, res) => {
  var id = req.params.id;

  DonationStatus.findByIdAndUpdate(
    id,
    { active: req.body.active },
    { new: true }
  )
    .then((result) => {
      res.json({ redirect: "/donations/status/" });
    })
    .catch((err) => {
      console.log(err);
    });
};

//status end --------------------------------------------------------------------------------

//Commented --------------------------------------------------------------------------------

/* Filter
donationcontroller.list_filter = (req, res) => {
  // get search conditions

  // create object to filter

  Donation.find(filter)
    .exec()
    .then((donations) => {
      res.render("donations/main", {
        title: "Donation Points",
        donations,
        type,
        participantType,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};*/

/* donationcontroller.delete = (req, res) => {
  var id = req.params.id;

  Donation.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: "/donations" });
    })
    .catch((err) => {
      console.log(err);
    });
}; */

/* Edit Donation 
donationcontroller.edit = (req, res) => {
  var filter = { _id: req.params.id };

  Donation.findById(filter)
    .exec()
    .then((donation) => {
      console.log(donation);
      res.render("donations/edit", {
        title: "Edit Donation",
        donation,
      });
    })
    .catch((err) => {
      console.log("Error: ", err);
    });
};*/

module.exports = donationcontroller;
