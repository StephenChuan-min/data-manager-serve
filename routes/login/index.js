const express = require('express');

const router = express.Router();
const MYSQL = require('../../tools/mysql');
const handler = require('../../tools/pulgin/cryhandler');

const redisMethod = require('../redis/method');

router.post('*', (req, res, next) => {
  next();
});

router.post('/in', (req, res) => {
  // console.log(next);
  const t = req.body;
  if (!t.name || !t.pwd) {
    res.errorText('The username or password can not be empty');
  }
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
            .then((value) => {
              if (value) {
                redisMethod.get(value).then((r) => {
                  const result = JSON.parse(r);
                  redisMethod.del(`${result.account}#${result.token}`);
                  result.token = _token;
                  redisMethod.set(`${r.account}#${_token}`, JSON.stringify(r));
                  res.success({ token: r.token }, 'Successful user login');
                });
              } else {
                data.token = _token;
                redisMethod.set(`${data.account}#${_token}`, JSON.stringify(data));
                res.success({ token: _token }, 'Successful user login');
              }
            })

            .catch(() => res.error(805));
        } else res.errorText('Password Error');
      } else res.errorText('The user does not exist！');
    })
    .catch((err) => res.errorText(err));
});

router.post('/reg', (req, res, next) => {
  const t = req.body;
  if (!t.name || !t.pwd) {
    res.errorText('The username or password can not be empty');
  } else {
    const pwdSalt = handler.randomString(16);
    const sql = `SELECT * from tbl_usr WHERE account = '${t.name}'`;
    /* 检验 是否已注册 */
    const createTime = MYSQL.DATEF(new Date(), 'yyyy/MM/dd hh:mm:ss');
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
            mobile: t.mobile || '',
            create_time: createTime,
          };
          const sqlStr = MYSQL.SQLJOIN(
            {
              type: 'INSERT',
              prop: itemProp,
            },
            'tbl_usr',
            {
              limit: true,
              num: 1,
            }
          );
          MYSQL.SINGLE(sqlStr)
            .then(() => res.successText('Successful registration,please sign in.'))
            .catch(() => res.error(100));
        } else res.errorText('The user does not exist！');
      })
      .catch(() => res.error(2));
  }
});

router.post('/c/:id', (req, res, next) => {
  // console.log(2)
  const v = handler.encryptMD5();
  MYSQL.SEND_RES(res, 'token获取成功', v);
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
  MYSQL.SEND_RES(res, 'A database error occurred. Please try again', null, false, 805);
  // res.render('index', { title: 'Express' });
});

router.post('/regin', (req, res, next) => {
  const v = handler.encryptMD5();
  MYSQL.SEND_RES(res, 'token获取成功', v);
});

module.exports = router;
