/**
 * @description' 获取 blogList 的 html 字符串方法
 * @author zhong
 */

const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const BLOG_LIST_PATH = fs.readFileSync(
    path.join(__dirname, '..', 'views', 'widgets', 'blog-list.ejs')
).toString();

function getBlogListStr(blogList = [], canReply = false) {
    return ejs.render(BLOG_LIST_PATH, {
        blogList,
        canReply
    });
}

module.exports = {
    getBlogListStr
};
