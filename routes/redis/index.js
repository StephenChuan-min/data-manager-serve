const express = require("express");

const router = express.Router();
// var mysql = require('../method/mysql');
const redisMethod = require("./method");
const globalPara = require("../../tools/dataSource/global");

/* redis 公共模块 baseUrl 校验 */
router.post("*", (req, res, next) => {
  const Url = req.baseUrl;
  let result = false;
  // console.log(Url, routerPath)
  for (const x in global.routerPath) {
    if (global.routerPath[x] === Url) {
      result = true;
      break;
    }
  }
  if (!result) res.sendErr("Specified route cannot be found", 806);
  next();
});

/* redis 公共模块 token 校验 */
router.post("/", (req, res, next) => {
  globalPara.reset();
  // const a = req.body
  // req.body.token = '496276df53f76ea2fa0df7bae839456e'
  const token = req.body.token || "";
  if (!token) {
    /* 无效的access token */
    res.sendErr("Parameter token invalid or no longer valid", 110);
  } else {
    redisMethod
      .keys(token, 1)
      .then((redisKey) => {
        if (redisKey) return redisMethod.get(redisKey);
        // eslint-disable-next-line prefer-promise-reject-errors
        return new Promise((resolve, reject) => reject("err"));
      })
      .then((val) => {
        global.tokeninfo = JSON.parse(val);
        next();
      })
      .catch((err) => {
        // access token过期
        res.sendErr("Parameter token expired", 111);
      });
  }
});

module.exports = router;
