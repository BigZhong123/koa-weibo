/**
 * @description 登录验证中间件
 * @author zhong
 */

const { ErrorModel } = require('../model/ResModel');
const { loginCheckFailInfo } = require('../model/errorInfo');

async function loginCheck(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 登录成功
        await next();
        return;
    }
    // 登录失败
    return new ErrorModel(loginCheckFailInfo);
}

async function loginRedirect(ctx, next) {
    if (ctx.session && ctx.session.userInfo) {
        // 登录成功
        await next();
        return;
    }
    const curUrl = ctx.url;
    ctx.redirect('/login?' + encodeURIComponent(curUrl));
}

module.exports = {
    loginCheck,
    loginRedirect
};
