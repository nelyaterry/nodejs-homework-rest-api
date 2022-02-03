const express = require("express");

const ctrl = require("../../controllers/users");
const { validation, auth, upload } = require("../../middlewares");
const { joiSchemaUser, joiUpdateSubscription } = require("../../model/user");

const router = express.Router();

const validationUser = validation(joiSchemaUser);
const validationSabs = validation(joiUpdateSubscription);

router.post("/signup", validationUser, ctrl.signup);
router.post("/login", validationUser, ctrl.login);
router.get("/current", auth, ctrl.current);
router.get("/logout", auth, ctrl.logout);
router.patch("/", auth, validationSabs, ctrl.updateSubscription);
router.patch("/avatars", auth, upload.single("avatar"), ctrl.addAvatar);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify", ctrl.verifyRepeat);
module.exports = router;
