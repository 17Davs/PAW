var express = require("express");
const donationController = require("../controllers/donation");
const {
  requireAuth /* , requireAdmin */,
} = require("../public/javascripts/auth");
var router = express.Router();
//status
router.get("/status", requireAuth, donationController.status_list);
router.get("/status/create", requireAuth, donationController.status_create);
router.post("/status/save", requireAuth, donationController.status_save);
router.get("/status/:id", requireAuth, donationController.status_edit);
router.delete("/status/:id", requireAuth, donationController.status_delete);
router.post("/status/:id", requireAuth, donationController.status_update);
router.put("/status/:id", requireAuth, donationController.status_put);
router.get("/status/:id/check", requireAuth, donationController.check_status);

//donation
router.get("/", requireAuth, donationController.list);

//router.post("/", requireAuth, donationController.list_filter);

router.get("/create", requireAuth, donationController.create);

router.post("/save", requireAuth, donationController.save);

router.get("/:id", requireAuth, donationController.view);

//router.get("/edit/:id", requireAuth, donationController.edit);

router.post("/update/:id", requireAuth, donationController.update);
router.post("/:id/upload-proof", requireAuth, donationController.upload_image);

module.exports = router;
