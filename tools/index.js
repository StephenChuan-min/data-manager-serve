/**
 * 发送信息
 * @param msg
 * @param data
 * @param status
 * @constructor
 */
const SEND_RES = function (msg = "", data = null, status) {
  const info = { status, msg };
  if (data) info.data = data;
  this.send(JSON.stringify(info));
};

const SEND_ERR = function (msg = "", status = 500) {
  this.send(JSON.stringify({ status, msg }));
};

module.exports = {
  SEND_RES,
  SEND_ERR,
};
