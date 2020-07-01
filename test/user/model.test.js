/**
 * @description 验证 user model
 * @author zhong
 */

const { User } = require('../../src/db/model')

test('验证 user model 的各个属性是否符合预期', () => {
    // build API会创建一个内存的 user 实例，不会储存到数据库中
    const user = User.build({
        userName: 'zhangsan',
        password: '123456',
        nickName: '张三',
        // gender: 1,
        picture: '/lala.jpg',
        city: '深圳'
    })
    expect(user.userName).toBe('zhangsan')
    expect(user.password).toBe('123456')
    expect(user.nickName).toBe('张三')
    expect(user.gender).toBe(3)
    expect(user.picture).toBe('/lala.jpg')
    expect(user.city).toBe('深圳')
})
