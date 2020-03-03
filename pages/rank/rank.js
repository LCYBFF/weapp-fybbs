// pages/rank.js

//获取应用实例
const app = getApp()

var API_CONFIG = require('../../utils/apiConfig.js');
var timeFormat = require('../../utils/timeFormat.js');
var request = require('../../utils/request.js');
var level = require('../../utils/level.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userList: []
  },
  
  /**
   * 获取用户列表
   */
  getUserList: function() {
    let that = this
    request.base(API_CONFIG.USERLIST)
      .then(function(res) {
        that.setData({
          userList: level.arrayTrans(timeFormat.arrayTimeToFormat(res.data.data, 'u_createat'))
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUserList()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getUserList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})