/**
 * @description 数据格式化
 * @author zhong
 */

const { defaultPicUrl } = require('../conf/constant');

function _formatUserPicture(obj) {
  if (obj.picture === null) {
    obj.picture = defaultPicUrl;
  }
  return obj;
}

function formatUser(list) {
  if (list === null) {
    return;
  }
  // 如果是数据列表
  if (list instanceof Array) {
    return list.map(_formatUserPicture);
  }
  // 如果是单个对象
  return _formatUserPicture(list);
}

module.exports = {
  formatUser
};
