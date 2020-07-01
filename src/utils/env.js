/**
 * @description 环境变量
 * @author zhong
 */

const DEV = process.env.NODE_ENV;

module.exports = {
    isDev: DEV === 'dev',
    notDev: DEV !== 'dev',
    isProd: DEV === 'production',
    notProd: DEV !== 'production',
    isTest: DEV === 'test',
    notTest: DEV !== 'test',
};