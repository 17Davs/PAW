var express = require("express");
var router = express.Router();
var donatorController = require("../../controllers/API/donatorControllerAPI");
var {
  verifyRoleDonor,
  verifyToken,
} = require("../../controllers/API/authControllerAPI");

/* router.post('/', donatorController.createDonator); */

router.get("/:id", verifyToken, donatorController.getOne);
router.put("/:id", verifyToken, verifyRoleDonor, donatorController.editDonator);
router.delete(
  "/:id",
  verifyToken,
  verifyRoleDonor,
  donatorController.deleteDonator
);

router.get(
  "/:id/donations",
  verifyToken,
  verifyRoleDonor,
  donatorController.getDonations
);

router.get(
  "/:id/convertPoints/:qtd",
  verifyToken,
  verifyRoleDonor,
  donatorController.convertPoints
);

router.param("id", donatorController.getById);

module.exports = router;
