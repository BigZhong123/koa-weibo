/**
 * @description 数据模型的入口文件
 * @author zhong
 */

const User = require('./user');
const Blog = require('./blog');

Blog.belongsTo(User, {
    foreignKey: 'userId'
});

module.exports = {
    User,
    Blog
};