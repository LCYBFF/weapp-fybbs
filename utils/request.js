// utils/request.js

/**
 * 请求数据并处理时间戳输出
 * url: 请求地址
 * param: 请求参数(字符串且唯一)
 * returnType: 请求返回的数据类型(1一维或2二维)
 */
function request(url, param = '') {
  // 预设返回值
  var returnData = new Promise((resolve, reject) => {
    wx.request({
      url: url + param,
      method: 'GET',
      header: {
          'Content-Type': 'application/json'
      },
      success: function (res) {
         resolve(res)
      },
      fail: function () {
        wx.showToast({'title':'请求失败','mask':true,'icon':'none'})
        reject([]);
      },
      complete: function() {
        wx.hideNavigationBarLoading()
        wx.stopPullDownRefresh()
      }
    })
  })
  return returnData;
}
module.exports = {
  base: request,
};