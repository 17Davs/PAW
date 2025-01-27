var express = require("express");
const pickupcontroller = require("../controllers/pickup");
const {
  requireAuth /* , requireAdmin */,
} = require("../public/javascripts/auth");
var router = express.Router();

router.get("/", requireAuth, pickupcontroller.list);

//router.post("/", requireAuth, pickupcontroller.list_filter);

router.get("/create", requireAuth, pickupcontroller.create);

router.post("/save", requireAuth, pickupcontroller.save);

router.get("/:id", requireAuth, pickupcontroller.view);

router.get("/edit/:id", requireAuth, pickupcontroller.edit);

router.post("/update/:id", requireAuth, pickupcontroller.update);

router.delete("/:id", requireAuth, pickupcontroller.delete);

router.put("/:id", requireAuth, pickupcontroller.update_status);
router.get("/:id/donations", requireAuth, pickupcontroller.get_donations);

module.exports = router;
