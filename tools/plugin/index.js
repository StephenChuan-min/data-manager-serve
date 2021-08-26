var captchapng = require('../../lib/captchapng');

// 手机号码校验
checkMobile = (value) => {
	const judgePhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
	const st = new RegExp(judgePhone);
	if (st.test(value)) return true;
	return false;
}

// 生成图片验证码
getIcode = () =>{
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

module.exports = {
	checkMobile,
	getIcode
};