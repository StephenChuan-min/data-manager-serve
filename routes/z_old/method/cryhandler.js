const crypto = require("crypto");
const utils = require("./utils.js");

const randomString = function (len) {
  len = len || 32;
  const $chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  /** **默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1*** */ const maxPos =
    $chars.length;
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
  }
  return pwd;
};
const decompile = function (val) {
  if (!val) return;
  const decodeData = crypto.privateDecrypt(
    utils.prikey,
    Buffer.from(val.toString("base64"), "base64")
  );
  return decodeData.toString();
};
const encryption = function (secret, salt) {
  if (!secret || !salt) return;
  const hash = crypto.createHmac("sha256", secret).update(salt).digest("hex");
  return hash;
};

const encryptMD5 = function () {
  const content = this.randomString(5);
  const shasum = crypto.createHash("md5").update(content).digest("hex");
  return shasum;
};
// 模块导出
module.exports = {
  randomString,
  decompile,
  encryption,
  encryptMD5,
};
