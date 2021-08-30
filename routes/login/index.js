const express = require('express');
const router = express.Router();
// 图形验证码
const MYSQL = require('../../tools/plugin/mysql');
const handler = require('../../tools/plugin/cryhandler');
const redisMethod = require('../../tools/plugin/redis');
const { checkMobile } = require('../../tools/plugin/index');
const { generateIcode } = require('../../tools/plugin/generate');
const { CaptchaPrefix, PreLoginPrefix } = require('../../tools/dataSource/redisKey');

// 获取图片验证码
router.get('/getCaptcha', (req, res) => {
  const { phone } = req.query;

  if (phone === '')  return res.errorText("手机号不能为空", 400);
  if (!checkMobile(phone))  return res.errorText("手机号格式错误", 400);

  const { number, captcha } = generateIcode();
  const captchaKey = CaptchaPrefix + phone;
  redisMethod.set(captchaKey, number);
  res.success({ captcha })
});

// 检查是否需要验证码
router.get('/preLogin', async (req,res) => {
  const { phone } = req.query;

  if (phone === '')  return res.errorText("手机号不能为空", 400);
  if (!checkMobile(phone))  return res.errorText("手机号格式错误", 400);

  var newNumber = 1;
  const proLoginKey = PreLoginPrefix + phone;
  const number = await redisMethod.get(proLoginKey);

  if (number !== null) {
    newNumber = parseInt(number) + 1;
  }
  redisMethod.set(proLoginKey, newNumber);

  const needCode = newNumber > 2;
  res.success({ needCode });
})

module.exports = router;
