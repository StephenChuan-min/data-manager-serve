const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const captchapng = require('../../lib/captchapng');
const { prikey, pubkey } = require('../dataSource/cryptoKey');
const { randomString, encryptMD5 } = require('./cryhandler');

// 生成图片验证码
generateIcode = () => {
	const number = parseInt(Math.random()*9000+1000);
	const capt = new captchapng(92, 28, number); // 图片宽度,图片高度,随机数字
	capt.color(0, 0, 0, 255);  // 图片背景色 (red, green, blue, alpha)
	capt.color(255, 255, 255, 255); // 数字颜色 (red, green, blue, alpha)
	const encode = capt.getBase64(); // 转base64
	const captcha = 'data:image/jpeg;base64,' + encode;
	return {
		number,
		captcha
	};
}

// 密码加盐、转MD5
generatePassword = (password) => {
	const AUTH_KEY = 'zlglz&1';
	const encrypt = randomString(6);
	var encryptPassword = password + encrypt + AUTH_KEY;     // 加盐
	const passwordMD5 = encryptMD5(encryptPassword);
	return {
		encrypt,
		passwordMD5
	}
}

// 生成token
generateToken = (data) => {
	let created = Math.floor(Date.now() / 1000);
	let token = jwt.sign({
		data,
		exp: created + 3600 * 24
	}, prikey, {algorithm: 'RS256'});
	return token;
}

// 校验token
verifyToken = (token) => {
	let res;
	try{
		let result = jwt.verify(token, pubkey, {algorithms: ['RS256']}) || {};
		let {exp = 0} = result
		let current = Math.floor(Date.now()/1000);
		if(current <= exp){
			res = result.data || {};
		}
	} catch(err){
		res = err;
	}
	return res;
}

module.exports = {
	generateIcode,
	generateToken,
	verifyToken
};