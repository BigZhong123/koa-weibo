/**
 * @description user controller
 * @author zhong
 */

const { getUserInfo, createUser, deleteUser, updateUser } = require('../services/user');
const { SuccessModel, ErrorModel } = require('../model/ResModel');
const {
    registerUserNameNotExistInfo,
    registerUserNameExistInfo,
    loginFailInfo,
    registerFailInfo,
    deleteUserFailInfo,
    changeInfoFailInfo,
    changePasswordFailInfo,
} = require('../model/errorInfo');
const doCrypro = require('../utils/crypto');

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

async function login(ctx, userName, password) {
    const userInfo = await getUserInfo(userName, doCrypro(password));
    if (!userInfo) {
    // 登录失败
        return new ErrorModel(loginFailInfo);
    }
    // 登录成功
    ctx.session.userInfo = userInfo;
    return new SuccessModel();
}

async function deleteCurUser(userName) {
    // 调用service
    const result = await deleteUser(userName);
    if (result) {
        // 成功
        return new SuccessModel();
    }
    // 失败
    return new ErrorModel(deleteUserFailInfo);
}

// ctx 用于修改 session
async function changeInfo(ctx, { nickName, picture, city} ){
    const { userName } = ctx.session.userInfo;
    // services
    const result = await updateUser(
        {
            newNickName: nickName,
            newPicture: picture,
            newCity: city
        }, {
            userName
        });
    if (result) {
        Object.assign(ctx.session.userInfo, {
            nickName,
            picture,
            city
        });
        return new SuccessModel();
    }
    return new ErrorModel(changeInfoFailInfo);
}

async function changePassword (userName, password, newPassword) {
    const result = await updateUser(
        {
            newPassword: doCrypro(newPassword),
        },
        {
            userName,
            password: doCrypro(password)
        }
    );
    if (result) {
        // 成功
        return new SuccessModel();
    }
    // 失败
    return new ErrorModel(changePasswordFailInfo);
}

async function logout(ctx) {
    delete ctx.session.userInfo;
    return new SuccessModel();
}

module.exports = {
    isExist,
    register,
    login,
    deleteCurUser,
    changeInfo,
    changePassword,
    logout
};