const express = require("express");

const ctrl = require("../../controllers/contacts");
const { validation, auth } = require("../../middlewares");
const { joiSchema, favoriteJoiSchema } = require("../../model/contact");

const router = express.Router();

const validateContact = validation(joiSchema);
const validateFavorite = validation(favoriteJoiSchema);

router.get("/", auth, ctrl.getAll);

router.get("/:contactId", auth, ctrl.getById);

router.post("/", auth, validateContact, ctrl.add);

router.delete("/:contactId", auth, ctrl.removeById);

router.put("/:contactId", auth, validateContact, ctrl.updateById);

router.patch(
  "/:contactId/favorite",
  auth,
  validateFavorite,
  ctrl.updateFavorite
);

module.exports = router;
