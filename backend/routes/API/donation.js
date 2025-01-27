var express = require("express");
var router = express.Router();
var donationController = require("../../controllers/API/donationControllerAPI");
var {
  verifyRoleDonor,
  verifyToken,
} = require("../../controllers/API/authControllerAPI");

router.get("/", verifyToken, donationController.getAll);

router.post(
  "/",
  verifyToken,
  verifyRoleDonor,
  donationController.createDonation
);

router.get("/:id", verifyToken, donationController.getOne);

router.param("id", donationController.getById);

module.exports = router;
