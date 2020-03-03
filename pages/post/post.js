// pages/post/post.js

var API_CONFIG = require('../../utils/apiConfig.js');
var timeFormat = require('../../utils/timeFormat.js');
var request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    post:[],
    comment:[]
  },
  
  /**
   * 获取帖子详情
   */
  getPostDetail: function(pid) {
    let that = this
    request.base(API_CONFIG.POSTDETAIL, pid)
      .then(function(res) {
        that.setData({
          post: timeFormat.timeToFormat(res.data.data)
        })
      })
  },
  
  /**
   * 获取本帖的所有评论
   */
  getCommentList: function(pid) {
    let that = this
    request.base(API_CONFIG.COMMENTLIST, pid)
      .then(function(res) {
        that.setData({
          comment: timeFormat.arrayTimeToFormat(res.data.data,'c_createat')
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostDetail(options.id)
    this.getCommentList(options.id)
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