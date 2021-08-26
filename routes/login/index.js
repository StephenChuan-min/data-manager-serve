const express = require('express');

const router = express.Router();
const MYSQL = require('../../tools/mysql');
const handler = require('../../tools/pulgin/cryhandler');

const redisMethod = require('../../tools/pulgin/redis');

router.post('*', (req, res, next) => {
  next();
});

router.get('/getCaptcha', (req, res) => {
  const { phone } = req.query;
  console.log(phone)
  res.send({
    data: 123
  })
})

module.exports = router;
