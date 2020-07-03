/**
 * @description api utils
 * @author zhong
 */

const { loginCheck } = require('../../middlewares/loginChecks');
const router = require('koa-router')();
const koaForm = require('formidable-upload-koa');
const { saveFile } = require('../../controller/utils');
router.prefix('/api/utils');

router.post('/upload', loginCheck, koaForm(), async (ctx, next) => {
    const { name, path, size, type } = ctx.req.files['file'];
    // 调用controller
    ctx.body = await saveFile({
        name,
        size,
        type,
        filePath: path
    });
});

module.exports = router;
