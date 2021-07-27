const express = require("express");

const router = express.Router();
const article = require("./article");
const login = require("./login");
const redis = require("./redis");

router.use("/login", login);
router.use("*", redis);
router.use("/article", article);

module.exports = router;
