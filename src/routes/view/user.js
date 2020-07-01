/**
 * @description routes view login register
 * @author zhong
 */

const router = require('koa-router')();

// 获取登录信息
function getLoginInfo(ctx) {
    let data = {
        isLogin: false
    };
    let userInfo = ctx.session.userInfo;
    if (userInfo) {
        data = {
            isLogin: true,
            userName: userInfo.userName,
        };
    }
    return data;
}

router.get('/register', async (ctx, next) => {
    await ctx.render('register', getLoginInfo(ctx));
});

router.get('/login', async (ctx, next) => {
    await ctx.render('login', getLoginInfo(ctx));
});

module.exports = router;
