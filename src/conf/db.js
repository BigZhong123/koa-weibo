/**
 * @description 存储配置文件
 * @author zhong
 */

const { isProd } = require('../utils/env');

let REDIS_CONF = {
  host: '127.0.0.1',
  port: 6379
};

let MYSQL_CONF = {
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: '123456',
  database: 'koa_weibo'
};

if (isProd) {
  REDIS_CONF = {
    // 线上环境的 redis 配置
    host: '127.0.0.1',
    port: 6379
  },
  MYSQL_CONF = {
    // 线上环境的 mysql 配置
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1234560',
    database: 'koa_weibo'
  };
}

module.exports = {
  REDIS_CONF,
  MYSQL_CONF
};