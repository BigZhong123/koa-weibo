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

module.exports = {
  getUserInfo,
  createUser
};