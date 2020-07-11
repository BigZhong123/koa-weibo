/**
 * @description blog services
 * @author zhong
 */

const { Blog, User } = require('../db/model');
const { formatUser } = require('./_formate');
const xss = require('xss');

// 创建微博
async function createBlog({ userId, content, image }) {
    const result = await Blog.create({
        userId,
        content: xss(content),
        image
    });
    return result.dataValues;
}

// 获取微博数据
async function getBlogListByUser({ userName, pageIndex = 0, pageSize = 10}) {
    // 拼接查询条件
    const userWhereOpts = {};
    if (userName) {
        userWhereOpts.userName = userName;
    }

    // 执行查询
    const result = await Blog.findAndCountAll({
        limit: pageSize, // 查询的条数
        offset: pageIndex * pageSize, // 跳过的条数
        order: [
            [ 'id', 'desc' ]
        ],
        include: [
            {
                model: User,
                attribute: ['userName', 'nickName', 'picture'],
                where: userWhereOpts
            }
        ]
    });

    // result.count 为查询到的条数
    // result.rows 为查询到的结果
    let blogList = result.rows.map(row => row.dataValues);

    blogList = blogList.map(blogItem => {
        const user = blogItem.user.dataValues;
        blogItem.user = formatUser(user);
        return blogItem;
    });

    return {
        count: result.count,
        blogList
    };
}

module.exports = {
    createBlog,
    getBlogListByUser
};
