var express = require('express');
const usercontroller = require('../controllers/user');
const entitiescontroller = require('../controllers/entities');
const donatorscontroller = require('../controllers/donators');
const { requireAuth, requireAdmin } = require('../public/javascripts/auth');
var router = express.Router();

router.get("/", (req, res, next) => {
  res.redirect("/dashboard");
});

/* Entities */
router.get("/entities", requireAuth, entitiescontroller.entities_get);

router.get("/entities/create", requireAuth, entitiescontroller.create_get);
router.post("/entities/create", requireAuth, entitiescontroller.create_post);

router.get('/entities/:id', requireAuth, entitiescontroller.entity_get);

router.get('/entities/:id/edit', requireAuth, entitiescontroller.update_get);
router.post('/entities/:id/edit', requireAuth, entitiescontroller.update_post);

/* Employees */
router.get('/employees', requireAuth, usercontroller.employees_get);

router.post('/employees/u/:id', requireAdmin, usercontroller.stat_post);

router.get('/employees/:id', requireAdmin, usercontroller.edit_get);
router.post('/employees/:id', requireAdmin, usercontroller.edit_post);


/* Donators */
router.get('/donators', requireAuth, donatorscontroller.donators_get);

router.get('/donators/create', requireAuth, donatorscontroller.create_get);
router.post('/donators/create', requireAuth, donatorscontroller.create_post);

router.post('/donators/u/:id', requireAuth, donatorscontroller.stat_post);

router.get('/donators/:id', requireAuth, donatorscontroller.donator_get);

router.get('/donators/:id/edit', requireAuth, donatorscontroller.update_get);
router.post('/donators/:id/edit', requireAuth, donatorscontroller.update_post);

module.exports = router;
