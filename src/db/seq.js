/**
 * @description sequelize 连接数据库
 * @author zhong
 */

const Sequelize = require('sequelize');
const { MYSQL_CONF } = require('../conf/db');
const { isProd, isTest } = require('../utils/env');

const { host,user, password, database, prot } = MYSQL_CONF;

const conf = {
  host,
  port,
  dialect:'mysql',
};

if (isTest) {
  conf.logging = () => {};
}

// 线上环境连接池配置
if (isProd) {
  conf.pool = {
    max: 5, // 连接池中的最大连接数
    min: 0, // 连接池中的最小连接数
    idle: 10000, // 如果一个连接池10s内没有被只用，则释放
  };
}

const seq = new Sequelize(database, user, password, conf);

module.exports = seq;

