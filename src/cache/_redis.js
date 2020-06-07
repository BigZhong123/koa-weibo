/**
 * @description 连接 redis 的方法 get set
 */

const { REDIS_CONF } = require('../conf/db');
const Redis = require('redis');


// 创建客户端
const redisClient = Redis.createClient(REDIS_CONF.port, REDIS_CONF.host);
redisClient.on('error', (err) => {
  console.error('redis is error : ', err);
});

/**
 * redis set
 * @param {string} key key
 * @param {string} val value
 * @param {number} timeout 过期时间
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 * redis get
 * @param {string} key key 
 */
function get(key) {
  // 由于读取数据时是异步IO操作，所以需要返回 promise
  const promise = new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
      }
      if (val === null) {
        resolve(null);
      }
      try {
        resolve(JSON.parse(val));
      } catch (error) {
        resolve(val);
      }
    });
  });
  return promise;
}

module.exports = {
  set,
  get
};