/**
 * @description route api 用户相关接口
 * @author zhong
 */

const router = require('koa-router')();
const { isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
} = require('../../controller/user.js');
const userValidate = require('../../validator/user');
const genValidator = require('../../middlewares/validator');
const { isTest } = require('../../utils/env');
const { loginCheck } = require('../../middlewares/loginChecks');

router.prefix('/api/user');

// 用户名是否存在
router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
});

// 注册
router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body;
    ctx.body = await register({
        userName,
        gender,
        password
    });
});

// 登录
router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    // 调用controller
    ctx.body = await login(ctx, userName, password);
});

// 删除用户
router.post('/delete', loginCheck, async (ctx, next) => {
    // 只有在测试环境下才能删除用户
    if (isTest) {
        // 测试环境下，测试账号登录之后删除自己
        const { userName } = ctx.session.userInfo;
        ctx.body = await deleteCurUser(userName);
    }
});

// 修改用户信息
router.patch('/changeInfo', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { nickName, picture, city } = ctx.request.body;
    ctx.body = await changeInfo(ctx, { nickName, picture, city });
});

// 修改密码
router.patch('/changePassword', loginCheck, genValidator(userValidate), async (ctx, next) => {
    const { password, newPassword } = ctx.request.body;
    const { userName } = ctx.session.userInfo;
    ctx.body = await changePassword(userName, password, newPassword);
});

// 退出登录
router.post('/logout', async (ctx, next) => {
    ctx.body = await logout(ctx);
});

module.exports = router; 