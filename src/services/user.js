/**
 * @description user services
 * @author zhong
 */

const { User } = require('../db/model');
const { formatUser } = require('./_formate');
const doCrypro = require('../utils/crypto');

async function getUserInfo (userName, password) {
    const whereOpt = {
        userName
    };
    if (password) {
        Object.assign(whereOpt, { password });
    }
    const result = await User.findOne({
        attributes: ['userName', 'nickName', 'city', 'picture', 'gender'],
        where: whereOpt
    });
    if (result === null) {
        return result;
    }

    // 数据的格式化
    const resultRes = formatUser(result.dataValues);
    return resultRes;
}

async function createUser({ userName, password, gender = 3, nickName }) {
    const result = await User.create({
        userName,
        password: doCrypro(password),
        nickName: nickName ? nickName : userName,
        gender
    });
    return result.dataValues;
}

async function deleteUser(userName) {
    const result = await User.destroy({
        where: {
            userName
        }
    });
    return result > 0;
}

async function updateUser(
    { newNickName, newPicture, newCity, newPassword },
    { userName, password }
) {
    // 拼接修改的数据
    const updateData = {};
    if (newNickName) {
        updateData.nickName = newNickName;
    }
    if (newPicture) {
        updateData.picture = newPicture;
    }
    if (newCity) {
        updateData.city = newCity;
    }
    if (newPassword) {
        updateData.password = newPassword;
    }
    // 拼接查询条件
    const whereOpt = { userName };
    if (password) {
        whereOpt.password = password;
    }
    // 执行修改
    const result = await User.update(updateData, {
        where: whereOpt
    });
    return result[0] > 0; // result 为删除的行数
}

module.exports = {
    getUserInfo,
    createUser,
    deleteUser,
    updateUser
};