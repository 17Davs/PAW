var express = require("express");
var router = express.Router();
var authController = require("../../controllers/API/authControllerAPI");

router.post("/login/donator", authController.loginDonator);
router.post("/login/entity", authController.loginEntity);

router.post("/logout/donator", authController.logoutDonator);
router.post("/logout/entity", authController.logoutEntity);

router.post("/register/donator", authController.registerDonator);
router.post("/register/entity", authController.registerEntity);

module.exports = router;
