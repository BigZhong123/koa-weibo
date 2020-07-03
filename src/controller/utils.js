/**
 * @description utils constroller
 * @author zhong
 */

const path = require('path');
const fs = require('fs-extra');
const { ErrorModel, SuccessModel } = require('../model/ResModel');
const { uploadFileSizeFailInfo } = require('../model/errorInfo');

// 文件的储存目录
const DIST_FILE_FOLDER = path.join(__dirname, '..', '..', 'uploadFiles');
// 文件体积最大为 1M
const MAX_SIZE = 1024 * 1024 * 1024;

// 如果文件目录不存在则创建目录
fs.pathExists(DIST_FILE_FOLDER).then(exists => {
    if (!exists) {
        fs.ensureDir(DIST_FILE_FOLDER);
    }
});

// 保存图片文件
async function saveFile({ size, name, type, filePath}) {
    if (size > MAX_SIZE) {
        // 删除文件
        await fs.remove(filePath);
        return new ErrorModel(uploadFileSizeFailInfo);
    }
    // 保存图片文件
    const fileName = Date.now() + name;
    const distFilePath = path.join(DIST_FILE_FOLDER, fileName);
    await fs.move(filePath, distFilePath);
    return new SuccessModel({
        url: '/' + fileName
    });
}

module.exports = {
    saveFile
};
