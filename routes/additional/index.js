const express = require("express");

const router = express.Router();
const operation = require("./operation");
const condition = require("./condition");

router.use("/operation", operation);
router.use("/condition", condition);

module.exports = router;
