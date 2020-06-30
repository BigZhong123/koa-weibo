/**
 * @description route api 用户相关接口
 * @author zhong
 */

const router = require('koa-router')();
const { isExist, register, login } = require('../../controller/user.js');
const userValidate = require('../../validator/user');
const genValidator = require('../../middlewares/validator');

router.prefix('/api/user');

// router.post('/isExist', async (ctx, next) => {
//   const { userName } = ctx.request.body;
//   // 调用 controller 层逻辑处理
//   ctx.body = await isExist(userName);
// });

router.post('/isExist', async (ctx, next) => {
    const { userName } = ctx.request.body;
    ctx.body = await isExist(userName);
});

router.post('/register', genValidator(userValidate), async (ctx, next) => {
    const { userName, password, gender } = ctx.request.body;
    ctx.body = await register({
        userName,
        gender,
        password
    });
});

router.post('/login', async (ctx, next) => {
    const { userName, password } = ctx.request.body;
    // 调用controller
    ctx.body = await login(ctx, userName, password);
});

module.exports = router;