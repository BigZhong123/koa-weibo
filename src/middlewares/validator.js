/**
 * @description 格式校验中间件
 * @author zhong
 */

const { ErrorModel } = require('../model/ResModel');
const { jsonSchemaFileInfo } = require('../model/errorInfo');

function genValidator(validatorFunc) {
    async function validate(ctx, next) {
        const data = ctx.request.body;
        const error = validatorFunc(ctx.request.body);
        if (error) {
            ctx.body =  new ErrorModel(jsonSchemaFileInfo);
            return;
        }
        await next();
    }
    return validate;
}

module.exports = genValidator;
