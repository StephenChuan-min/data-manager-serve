const redis = require("redis");

const set = (key, value, time) => {
  const client = redis.createClient();
  client.set(key, value);
  time = time || 1 * 3600 * 24;
  client.expire(key, time);
  client.quit();
};

const get = (key) =>
  new Promise((resolve, reject) => {
    const client = redis.createClient();
    let result;
    client.get(key, (err, response) => {
      client.quit();
      if (err) {
        reject(err);
        return;
      }
      resolve(response);
    });
  });

const del = (key) => {
  const client = redis.createClient();
  client.del(key);
  client.quit();
};

const keys = function (key, type) {
  return new Promise((resolve, reject) => {
    const client = redis.createClient();
    key = type ? `*#${key}` : `${key}#*`;
    client.keys(key, (err, response) => {
      client.quit();
      if (err) {
        reject(err);
        return;
      }
      resolve(response[0]);
    });
  });
};

module.exports = {
  set,
  get,
  del,
  keys,
};
