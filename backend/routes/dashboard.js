var express = require("express");
const dashboardController = require("../controllers/dashboard");
const {
  requireAuth /* , requireAdmin */,
} = require("../public/javascripts/auth");
var router = express.Router();

router.get("/", requireAuth, dashboardController.show);

module.exports = router;
