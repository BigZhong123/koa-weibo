const router = require('koa-router')();

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    isMe: false,
    blogList: [
      {
        id: 1,
        title: 'zhang'
      },
      {
        id: 2,
        title: 'li'
      },
      {
        id: 3,
        title: 'wang'
      }
    ]
  });
});

router.get('/json', async (ctx, next) => {
  throw Error();
  
  // eslint-disable-next-line no-unreachable
  const session = ctx.session;
  // if (session.viewNum === null) {
  //   session.viewNum = 0
  // }
  // session.viewNum++

  ctx.body = {
    title: 'koa2 json',
    // viewNum: session.viewNum
  };
});

router.get('/profile/:userName', async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    slogan: 'This is profile',
    userName,
  };
});

router.get('/loadMore/:userName/:pageIndex', async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    slogan: 'This is loadMore',
    userName,
    pageIndex
  };
});

module.exports = router;
