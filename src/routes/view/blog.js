/**
 * @description 微博 views 路由
 * @author zhong
 */

const { loginRedirect } = require('../../middlewares/loginChecks');
const { getProfileBlogList } = require('../../controller/blog-profile');

const router = require('koa-router')();

// 微博首页
router.get('/', loginRedirect, async (ctx, next) => {
    await ctx.render('index');
});

// 个人主页
router.get('/profile', loginRedirect, async (ctx, next) => {
    const { userName } = ctx.session.userInfo;
    ctx.redirect(`/profile/${userName}`);
});

router.get('/profile/:userName', loginRedirect, async (ctx, next) => {
    // 已登录用户的信息
    const myUserInfo = ctx.session.userInfo;
    const myUserName = myUserInfo.userName;

    let curUserInfo;
    const { userName: curUserName } = ctx.params;
    const isMe = myUserName === curUserName;
    if (isMe) {
        // 是当前登录用户
        curUserInfo = myUserInfo;
    } else {
        // 不是当前登录用户
        const existResult = await isExist(curUserName);
        if (existResult.errno !== 0) {
            // 用户名不存在
            return;
        }
        // 用户名存在
        curUserInfo = existResult.data;
    }

    // 获取微博第一页数据
    const result = await getProfileBlogList(curUserName, 0);
    const { isEmpty, blogList, pageSize, pageIndex, count } = result.data;

    await ctx.render('profile', {
        blogData: {
            isEmpty,
            blogList,
            pageSize,
            pageIndex,
            count
        },
        userData: {
            userInfo: curUserInfo,
            isMe,
        }
    });
});

module.exports = router;