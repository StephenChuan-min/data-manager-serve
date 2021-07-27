const express = require("express");
// var app = express();
const router = express.Router();

/* Check router path . */
router.get("/", (req, res, next) => {
  res.location("/index.html");
});

router.get("/url", (req, res, next) => {
  const a = router.toString();
  const urls = [];
  // parseHandle("", urls, router.app._router)
  res.send(`GET request to homepage`);
  // mysql.SEND_RES(res, urls, null, false,502)
});

module.exports = router;
