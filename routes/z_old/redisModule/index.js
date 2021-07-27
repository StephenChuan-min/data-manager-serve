const express = require("express");

const router = express.Router();
const redisMethod = require("./method");
const globalPara = require("../method/global");

// router.post('*', function(req, res, next) {
//   console.log(8263275)
//   console.log(router.app._router,)
//   var urls = []
//   res.send('GET request to homepage');
//   parseHandle("", urls, router.app._router)
//   mysql.SEND_RES(res, urls, null, false,502)
// });

/* redis 公共模块 token 校验 */
router.post("*", (req, res, next) => {
  globalPara.reset();
  // const a = req.body
  req.body.token = "496276df53f76ea2fa0df7bae839456e";
  const token = req.body.token || "";
  if (!token) {
    /* 无效的access token */
    info = {
      state: 110,
      msg: "Access token invalid or no longer valid",
    };
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
    return;
  }
  redisMethod
    .keys(token, 1)
    .then((rediskey) => {
      if (rediskey) {
        return redisMethod.get(rediskey);
      }
      throw "err";
    })
    .then((val) => {
      tokeninfo = val;
      next();
    })
    .catch((err) => {
      MYSQL.SEND_RES(res, "身份验证已过期，请重新验证！", null, false, 502);
    });
});

module.exports = router;
