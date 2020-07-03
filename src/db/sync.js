/**
 * @description 同步数据库
 * @author zhong
 */

const seq = require('./seq');

require('./model');

seq.authenticate().then(() => {
    console.log('auth success');
}).catch((err) => {
    console.log('auth err');
});

// 执行同步
seq.sync({ force: true }).then(() => {
    console.log('sync success');
    process.exit();
});
