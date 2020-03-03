// level.js

/**
 * @param exp 经验值
 */
function expToLevel(exp) {
  if (exp < 15) {
    // 0~15 lv1
    return 1
  } else if (exp >= 15 && exp < 30) {
    // 15~30 lv2
    return 2
  } else if (exp >= 30 && exp < 100) {
    // 30~100 lv3
    return 3
  } else if (exp >= 100 && exp < 200) {
    // 100~200 lv4
    return 4
  } else if (exp >= 200 && exp < 500) {
    // 100~200 lv4
    return 5
  } else if (exp >= 500) {
    // 100~200 lv4
    return 6
  }
}

/**
 * @param data 用户二维信息数组
 */
function arrayTrans(data) {
  for (let i = 0; i < data.length; i++) {
    data[i]['exp'] = expToLevel(data[i]['exp'])
  }
  return data
}

module.exports = {
  arrayTrans: arrayTrans,
  expToLevel: expToLevel
};