const express = require("express");

const router = express.Router();
// var MYSQL = require('../../_methods/MYSQL');

router.post("/data", (req, res, next) => {
  const sql =
    "SELECT `lot_item`.key as `ikey`, `lot_item`.name as `iname`, `lot_type`.name as `tname`, `lot_org`.name as `oname` FROM `lot_item` LEFT JOIN `lot_type` ON `lot_type`.id = `lot_item`.lot_type LEFT JOIN `lot_org` ON `lot_type`.lot_org = `lot_org`.key";
  MYSQL.ROW(sql)
    .then((data) => {
      MYSQL.SEND_RES(res, "数据获取成功!", data);
    })
    .catch((data) => {
      MYSQL.SEND_RES(res, "数据异常,请稍后再试!", null, false);
    });
});

module.exports = router;
