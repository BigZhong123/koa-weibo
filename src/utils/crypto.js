/**
 * @description md5加密
 * @author zhong
 */

const crypto = require('crypto');

const  { CRYPTO_SECRET_KEY } = require('../conf/secret');

// md5加密
function _md5(content) {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

// 加密方法
function doCrypro(content) {
  const str = `password=${content}&secret=${CRYPTO_SECRET_KEY}`;
  return _md5(str);  
}

module.exports = doCrypro;
