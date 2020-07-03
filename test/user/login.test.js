/**
 * @description 测试 user api
 * @author zhong
 */

const server = require('../server');

// 用户信息
const userName = `u_${Date.now()}`;
const password = `p_${Date.now()}`;
const testUser = {
    userName,
    password,
    gender: 1
}

let COOKIE = '';

// 测试注册用户
test('测试注册，应该成功', async () => {
    const res = await server.post('/api/user/register').send(testUser);
    expect(res.body.errno).toBe(0);
})

// 测试重复注册用户
test('重复注册用户，应该失败', async () => {
    const res = await server.post('/api/user/register').send(testUser);
    expect(res.body.errno).not.toBe(0);
})

// 查询用户名是否存在
test('查询用户名，应该成功', async () => {
    const res = await server.post('/api/user/isExist').send({userName});
    expect(res.body.errno).toBe(0);
})

// json schema 验证
test('json schema 验证， 应该失败', async () => {
    const userInfo = {
        userName: '123',
        password: '1',
        gender: '1'
    }
    const res = await server.post('/api/user/register').send(userInfo)
    expect(res.body.errno).not.toBe(0);
})

// 登录
test('测试登录，应该成功', async () => {
    const res = await server.post('/api/user/login').send({
        userName,
        password
    })
    expect(res.body.errno).toBe(0);
    COOKIE = res.headers['set-cookie'].join(';')
})

// 修改基本信息
test('修改基本信息应该成功', async () => {
    const res = await server
        .patch('/api/user/changeInfo')
        .send({
            nickName: '测试昵称',
            city: '测试城市',
            picture: '/test.png'
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

// 修改密码
test('修改密码应该成功', async () => {
    const res = await server
        .patch('/api/user/changePassword')
        .send({
            password,
            newPassword: `p_${Date.now()}`
        })
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

// 删除用户
test('删除用户，应该成功', async () => {
    const res = await server.post('/api/user/delete').set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
})

// 退出
test('退出登录应该成功', async () => {
    const res = await server
        .post('/api/user/logout')
        .set('cookie', COOKIE);
    expect(res.body.errno).toBe(0);
});

// 再次查询用户，应该不存在
test('再次查询用户名，应该失败', async () => {
    const res = await server.post('/api/user/isExist').send({userName});
    expect(res.body.errno).not.toBe(0);
})
