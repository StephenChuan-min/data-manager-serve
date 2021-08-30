// 手机号码校验
checkMobile = (value) => {
	const judgePhone = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
	const st = new RegExp(judgePhone);
	if (st.test(value)) return true;
	return false;
}

module.exports = {
	checkMobile,
};