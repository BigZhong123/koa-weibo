/**
 * @description route api 用户相关接口
 * @author zhong
 */

const router = require('koa-router')();
const { isExist, register } = require('../../controller/user.js');

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

router.post('/register', async (ctx, next) => {
  const { userName, password, gender } = ctx.request.body;
  ctx.body = await register({
    userName,
    gender,
    password
  });
});

module.exports = router;