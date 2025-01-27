var express = require("express");
var router = express.Router();
var rulesController = require("../../controllers/API/rulesControllerAPI");
var {
  verifyRoleDonor,
  verifyToken,
} = require("../../controllers/API/authControllerAPI");

router.get("/", verifyToken, verifyRoleDonor, rulesController.getAll);
router.get("/:id", verifyToken, verifyRoleDonor, rulesController.getOne);
router.param("id", rulesController.getById);

module.exports = router;
