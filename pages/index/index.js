// pages/index/index.js

//获取应用实例
const app = getApp()

var API_CONFIG = require('../../utils/apiConfig.js');
var timeFormat = require('../../utils/timeFormat.js');
var request = require('../../utils/request.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    postList: [],
    navList: [],
    navNow: 1
  },
  
  /**
   * 帖子详情跳转
   */
  toDetail: function(e) {
    wx.navigateTo({
      url: '../post/post?id='+e.currentTarget.id
    })
  },
  
  /**
   * 导航栏tab改变
   */
  tabChange: function(e) {
    this.getPostList(e.detail.name)
    this.setData({
      navNow: e.detail.name
    })
  },
  
  /**
   * 搜索跳转
   */
  toSearch: function(e) {
    wx.navigateTo({
      url: '../search/search?keyword='+e.detail
    })
  },
  
  /**
   * 获取导航版块列表
   */
  getNavList: function() {
    let that = this
    request.base(API_CONFIG.NAVLIST)
      .then(function(res) {
        that.setData({
          navList: res.data.data
        })
      })
  },
  
  /**
   * 获取帖子列表
   */
  getPostList: function (nid) {
    let that = this,
    nav = nid?nid:1;
    request.base(API_CONFIG.POSTLIST, '?nid=' + nav)
      .then(function(res) {
        that.setData({
          postList: timeFormat.arrayTimeToFormat(res.data.data)
        })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getPostList()
    this.getNavList()
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
    wx.showNavigationBarLoading()
    this.getPostList(this.data.navNow)
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