/**
 * @description 统一的数据类型
 * @author zhong
 */

const Sequelize = require('sequelize');

module.exports = {
    STRING: Sequelize.STRING,
    INTEGER: Sequelize.INTEGER,
    DECIMAL: Sequelize.DECIMAL,
    TEXT: Sequelize.TEXT,
    BOOLEAN: Sequelize.BOOLEAN
};