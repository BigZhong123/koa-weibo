/**
 * @description 微博格式校验
 * @author zhong
 */

const validate = require('./_validator');

// 校验规则
const SCHEMA = {
    type: 'object',
    properties: {
        content: {
            type: 'string',
            allowNull: false
        },
        image: {
            type: 'string',
            maxLength: 255
        }
    }
};

function blogValidate(data = {}) {
    return validate(SCHEMA, data);
}

module.exports = blogValidate;
