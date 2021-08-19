const express = require('express');
// var app = express();
const router = express.Router();

const login = require('./login');
const redis = require('./redis');
const article = require('./article');

// router.get('/url', (req, res, next) => {
//   // parseHandle("", urls, router.app._router)
//   res.send(`GET request to homepage`);
// });

/**
 * @swagger
 * /in:
 *   post:
 *    tags:
 *      - 'login about'
 *    summary: Add a new pet to the store
 *    parameters:
 *     - name: name
 *       in: body
 *       required: true
 *       type: string
 *       description: 用户名
 */

router.use('/login', login);
router.use('*', redis);
router.use('/article', article);

module.exports = router;
