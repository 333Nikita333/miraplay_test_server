const express = require("express");

const ctrl = require("../controllers/users");
const { validateBody } = require("../middlewares");
const { schemas } = require("../schemas/user");

const router = express.Router();

router.post("/register", validateBody(schemas.authSchema), ctrl.register);

module.exports = router;
