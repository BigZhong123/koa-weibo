const Koa = require('koa');
const app = new Koa();
const path = require('path');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-generic-session');
const redisStroe = require('koa-redis');
const { REDIS_CONF }  = require('./conf/db');
const { isProd } = require('./conf/db');

const index = require('./routes/index');
const userViewRouter = require('./routes/view/user');
const userApiRouter = require('./routes/api/user');
const utilsApiRouter = require('./routes/api/utils');
const errorViewRouter = require('./routes/view/error');
const { SESSION_SECRET_KEY } = require('./conf/secret');

// error handler
let onerrorConf = {};
if (isProd) {
    onerrorConf = {
        redirect: '/error'
    };
}
onerror(app, onerrorConf);

// middlewares 解析请求的 body
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}));
app.use(json());

// 日志
app.use(logger());

// 将 public 当做静态资源的目录
app.use(require('koa-static')(__dirname + '/public'));
app.use(require('koa-static')(path.join(__dirname, '..', '/uploadFiles')));


// 注册 ejs
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));

// logger 手写的日志 logger
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// session 的配置
app.keys=[SESSION_SECRET_KEY];
app.use(session({
    key: 'weibo.sid', // cookie name 默认是 koa.sid
    prefix: 'weibo:sess:', // redis 的前缀 默认是 koa:sess:
    cookie: {
        path: '/', // 能访问到 cookie 的域
        httpOnly: true, // 只用于 http 传输
        maxAge: 24 * 60 * 60 * 1000 // cookie 的过期时间
    },
    // ttl: 24 * 60 * 60 * 1000, // session 的过期时间，不填默认和 cookie 的过期时间一样
    store: redisStroe({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}));

// routes
app.use(index.routes(), index.allowedMethods());
app.use(userViewRouter.routes(), userViewRouter.allowedMethods());
app.use(userApiRouter.routes(), userApiRouter.allowedMethods());
app.use(utilsApiRouter.routes(), utilsApiRouter.allowedMethods());
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods()); // 404 和 error 应该注册在最后面

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx);
});

module.exports = app;
