const mysql = require("mysql");
const sqlJoin = require("./pulgin/sqljoin");
const dataparse = require("./pulgin/dataformt");
const config = require("../../serverconfig");

const pool = mysql.createPool(config.MYSQLCONFIG);

const SEND_RES = (res, text, data = null, flag = false, status) => {
  const _status = !flag ? status || 200 : status || 500;
  const obj = {
    status: _status,
    msg: text,
  };
  if (data) obj.data = data;
  res.send(JSON.stringify(obj));
};

const beginTSA = () =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) reject(err);
      else {
        connection.beginTransaction((error) => {
          if (error) reject(error);
          else {
            resolve(connection);
          }
        });
      }
    });
  });
/** 只返回 连接状态  */
const course = (connection, sql, params) =>
  new Promise((resolve, reject) => {
    connection.query(sql, params, (err, res) => {
      // console.log('res')
      if (err) {
        return connection.rollback(() => {
          resolve(err);
        });
      }
      resolve(connection);
    });
  });
/** 返回 连接状态 && 查询结果 */
const course_res = (connection, sql, params) =>
  new Promise((resolve, reject) => {
    connection.query(sql, params, (err, res) => {
      if (err) {
        return connection.rollback(() => {
          resolve(err);
        });
      }
      resolve({
        con: connection,
        res: res || null,
      });
    });
  });

const finishTSA = (connection) =>
  new Promise((resolve, reject) => {
    connection.commit((err) => {
      if (err) {
        return connection.rollback(() => {
          resolve(err);
        });
      }
      resolve("success");
    });
  });

// 将结果与对象数组返回
const row = (sql, params) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (error, res) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  });
// 返回一个对象
const first = (sql, params) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (error, res) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res || null);
      });
    });
  });
// 返回单个查询结果
const single = (sql, params) => {
  console.log("getConnection");
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (error, res) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res[0] || null);
        // console.log(res[0])
        // for (let i in res[0]) {
        //   resolve(res[0][i] || null);
        //   return;
        // }
        // resolve(null);
      });
    });
  });
};
// 执行代码，返回执行结果
const execute = (sql, params) =>
  new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, (error, res) => {
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(res);
      });
    });
  });

// 模块导出
module.exports = {
  TSA: {
    begin: beginTSA,
    finish: finishTSA,
    course,
    course_res,
  },
  SEND_RES,
  ROW: row,
  FIRST: first,
  SINGLE: single,
  EXECUTE: execute,
  SQLJOIN: sqlJoin,
  DATEF: dataparse,
};
