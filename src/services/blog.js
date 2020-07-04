/**
 * @description blog services
 * @author zhong
 */

const { Blog } = require('../db/model');
const xss = require('xss');

async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content: xss(content),
        image
    });
    return result.dataValues;
}

module.exports = {
    createBlog
};
