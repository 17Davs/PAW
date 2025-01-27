var express = require("express");
var router = express.Router();
var entityController = require("../../controllers/API/entityControllerAPI");
var {
  verifyRoleEntity,
  verifyToken,
} = require("../../controllers/API/authControllerAPI");

/* router.post('/', entityController.createEntity); */
router.get("/", verifyToken, entityController.getAll);
router.get("/:id", verifyToken, entityController.getOne);
router.put("/:id", verifyToken, verifyRoleEntity, entityController.editEntity);
router.delete(
  "/:id",
  verifyToken,
  verifyRoleEntity,
  entityController.deleteEntity
);

router.get("/:id/donations", verifyToken, entityController.getDonations);

router.param("id", entityController.getById);

module.exports = router;
