/**
 * @description 微博 api
 * @author zhong
 */

const { loginCheck } = require('../../middlewares/loginChecks');

const router = require('koa-router')();
const { create } = require('../../controller/blog-home');
const genValidator = require('../../middlewares/validator');
const blogValidate = require('../../validator/blog');

router.prefix('/api/blog');

// 创建微博
router.post('/create', loginCheck, genValidator(blogValidate), async (ctx, next) => {
    const { content, image } = ctx.request.body;
    const { id: userId } = ctx.session.userInfo;
    ctx.body = await create({
        userId,
        content,
        image
    });
});

module.exports = router;
