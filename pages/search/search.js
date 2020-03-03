// pages/search/search.js

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
    navNow: 1,
    keyword: ''
  },
  
  /**
   * 导航栏tab改变
   */
  tabChange: function(e) {
    let keyword = this.data.keyword
    this.getSearchList(e.detail.name, keyword)
    this.setData({
      navNow: e.detail.name
    })
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
   * 获取搜索结果
   */
  getSearchList: function (nid, keyword) {
    let that = this,
    nav = nid?nid:1;
    request.base(API_CONFIG.POSTLIST, '?nid=' + nav + '&' + 'keyword=' + keyword)
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
    this.setData({
      keyword: options.keyword
    })
    this.getNavList()
    this.getSearchList(options.id, options.keyword)
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
    this.getPostList(this.data.navNow, this.data.keyword)
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