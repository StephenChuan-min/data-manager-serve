const express = require("express");

const router = express.Router();
const MYSQL = require("../../../tools/mysql");
const handler = require("../../_methods/pulgin/cryhandler");

const redisMethod = require("../redis/method");

router.post("*", (req, res, next) => {
  next();
});
router.post("/in", (req, res) => {
  const t = req.body;
  if (!t.name || !t.pwd) {
    res.sendErr("The username or password can not be empty");
  } else {
    const sql = `SELECT * from tbl_usr WHERE account = '${t.name}' or mobile = '${t.name}' `;
    MYSQL.SINGLE(sql)
      .then((data) => {
        if (data) {
          const secret = handler.decompile(t.pwd);
          const hash = handler.encryption(secret, data.pwd_salt);
          if (hash === data.pwd) {
            const _token = handler.encryptMD5();
            redisMethod
              .keys(data.account)
              .then((d) => {
                if (d) return redisMethod.get(d);
                data.token = _token;
                redisMethod.set(
                  `${data.account}#${_token}`,
                  JSON.stringify(data)
                );
                return MYSQL.SEND_RES(res, "Successful user login", {
                  token: _token,
                });
              })
              .then((r) => {
                const result = JSON.parse(r);
                redisMethod.del(`${result.account}#${result.token}`);
                result.token = _token;
                redisMethod.set(`${r.account}#${_token}`, JSON.stringify(r));
                MYSQL.SEND_RES(res, "Successful user login", {
                  token: r.token,
                });
              })
              .catch(() => {
                MYSQL.SEND_RES(
                  res,
                  "A database error occurred. Please try again",
                  null,
                  false,
                  805
                );
              });
          } else {
            MYSQL.SEND_RES(res, "Password Error", null, false);
          }
        } else {
          MYSQL.SEND_RES(res, "The user does not exist！", null, false);
        }
      })
      .catch(() => {
        res.sendErr("Service temporarily unavailable", 2);
      });
  }
});

router.post("/reg", (req, res, next) => {
  const t = req.body;
  if (!t.name || !t.pwd) {
    MYSQL.SEND_RES(
      res,
      "The username or password can not be empty",
      null,
      false
    );
  } else {
    const pwdSalt = handler.randomString(16);
    const sql = `SELECT * from tbl_usr WHERE account = '${t.name}'`;
    /* 检验 是否已注册 */
    const createTime = MYSQL.DATEF(new Date(), "yyyy/MM/dd hh:mm:ss");
    MYSQL.SINGLE(sql)
      .then((data) => {
        if (!data) {
          /* 未注册用户流程 */
          const hash = handler.encryption(t.pwd, pwdSalt);
          const itemProp = {
            account: t.name,
            pwd: hash,
            pwd_salt: pwdSalt,
            usr_type: 1,
            mobile: t.mobile || "",
            create_time: createTime,
          };
          const sql = MYSQL.SQLJOIN(
            {
              type: "INSERT",
              prop: itemProp,
            },
            "tbl_usr",
            {
              limit: true,
              num: 1,
            }
          );
          MYSQL.SINGLE(sql)
            .then(() => {
              MYSQL.SEND_RES(
                res,
                "Successful registration,please sign in.",
                null
              );
            })
            .catch(() => {
              // console.log(err);
              MYSQL.SEND_RES(res, "Invalid parameter", null, false, 100);
            });
        } else {
          MYSQL.SEND_RES(res, "The user does not exist！", null, false);
        }
      })
      .catch((data) => {
        MYSQL.SEND_RES(res, "Service temporarily unavailable", data, false, 2);
      });
  }
});
// _item_prop.creatime = nowtime;
// var sql = MYSQL.SQLJOIN({
//   type: 'INSERT',
//   prop: _item_prop
// }, 'as_basic', {
//   limit: true,
//   num: 1
// })

router.post("/c", (req, res, next) => {
  // console.log(2)
  const v = handler.encryptMD5();
  MYSQL.SEND_RES(res, "token获取成功", v);
  // crypto.decrypt(encrypted, key) => {
  // 注意，encrypted是Buffer类型
  // console.log(v)
  // const encodeData = crypto.publicEncrypt(utils.pubkey, Buffer.from(`newtotna`)).toString('base64');
  // const encodeData =req.body.pwd;
  // console.log("encode: ", encodeData)
  // const decodeData = crypto.privateDecrypt(utils.prikey, Buffer.from(encodeData.toString('base64'), 'base64'));
  // console.log("decode: ", decodeData.toString())
  // };
  // console.log(ends)
  MYSQL.SEND_RES(
    res,
    "A database error occurred. Please try again",
    null,
    false,
    805
  );
  // res.render('index', { title: 'Express' });
});
router.post("/regin", (req, res, next) => {
  const v = handler.encryptMD5();
  MYSQL.SEND_RES(res, "token获取成功", v);
});

module.exports = router;
