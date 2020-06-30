/**
 * @description json schema 校验
 * @author zhong
 */

const Ajv = require('ajv');
const ajv = new Ajv({
    // allErrors: true
});

function validate(schema, data = {}) {
    const valid = ajv.validate(schema, data);
    if (!valid) {
        return ajv.errors[0];
    }
}

module.exports = validate;