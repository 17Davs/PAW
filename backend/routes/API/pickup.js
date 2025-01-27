var express = require("express");
var router = express.Router();
var pickupController = require("../../controllers/API/pickupControllerAPI");
var { verifyToken } = require("../../controllers/API/authControllerAPI");
router.get("/", verifyToken, pickupController.getAll);
router.get("/:id", verifyToken, pickupController.getOne);
router.param("id", pickupController.getById);

module.exports = router;
