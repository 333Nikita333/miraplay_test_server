const express = require("express");

const ctrl = require("../controllers/users");
const { validateBody, authenticate } = require("../middlewares");
const { schemas } = require("../schemas/user");

const router = express.Router();

router.post("/register", validateBody(schemas.authSchema), ctrl.register);
router.post("/login", validateBody(schemas.authSchema), ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);

module.exports = router;
