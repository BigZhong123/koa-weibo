/**
 * @description user controller
 * @author zhong
 */

const { getUserInfo, createUser } = require('../services/user');
const { SuccessModel, ErrorModel, registerFailInfo } = require('../model/ResModel');
const {
  registerUserNameNotExistInfo,
  registerUserNameExistInfo
} = require('../model/errorInfo');

// 用户名是否存在;
async function isExist (userName) {
  const result = await getUserInfo(userName);
  if (result) {
    // 用户名不存在
    return new SuccessModel(result);
  } else {
    // 用户名已存在
    return new ErrorModel(registerUserNameNotExistInfo);
  }
}

async function register ({ userName, password, gender}) {
  const userInfo = await getUserInfo(userName);
  if (userInfo) {
    return new ErrorModel(registerUserNameExistInfo);
  }
  try {
    await createUser({ userName, password, gender });
    return new SuccessModel();
  } catch (error) {
    console.error(error.message, error.stack );
    return new ErrorModel(registerFailInfo);
  }
}

module.exports = {
  isExist,
  register
};