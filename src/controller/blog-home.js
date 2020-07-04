/**
 * @description blog-home api
 * @author zhong
 */

const { createBlog } = require('../services/blog');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const { createBlogFailInfo } = require('../model/errorInfo');

async function create({ userId, content, image }) {
    try {
        const blog = await createBlog({
            userId,
            content,
            image
        });
        return new SuccessModel();
    } catch (err) {
        console.error(err.stack, err.message);
        return new ErrorModel(createBlogFailInfo);
    }
}

module.exports = {
    create
};
