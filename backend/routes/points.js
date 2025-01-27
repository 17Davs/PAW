var express = require("express");
const pointcontroller = require("../controllers/point");
const {
  requireAuth /* , requireAdmin */,
} = require("../public/javascripts/auth");
var router = express.Router();

router.get("/", requireAuth, pointcontroller.list);

//router.post("/", requireAuth, pointcontroller.list_filter);

router.get("/rule/create", requireAuth, pointcontroller.create);

router.post("/rule/save", requireAuth, pointcontroller.save);

router.get("/rule/:id", requireAuth, pointcontroller.view);

router.get("/rule/edit/:id", requireAuth, pointcontroller.edit);

router.post("/rule/update/:id", requireAuth, pointcontroller.update);

router.delete("/rule/:id", requireAuth, pointcontroller.delete);

module.exports = router;
