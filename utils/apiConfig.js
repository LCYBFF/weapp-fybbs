// apiConfig.js

// 本地环境-ip访问服务器api接口
const API_BASE_URL1 = "http://101.133.145.24:8502";

const LOCAL_CONFIG = {
  BASE_URL: API_BASE_URL1,
  USERLIST: API_BASE_URL1+'/api/user',
  NAVLIST: API_BASE_URL1+'/api/nav',
  POSTLIST: API_BASE_URL1+'/api/post?page=1',
  POSTDETAIL: API_BASE_URL1+'/api/post/',
  COMMENTLIST: API_BASE_URL1+'/api/comment?pid=',
}

// 线上环境-Mock数据
const API_BASE_URL2 = "https://www.fastmock.site/mock/13ee25836801c1a9d45a71478d3e7b98/fybbs"

const ONLINE_CONFIG = {
  BASE_URL: API_BASE_URL2,
  USERLIST: API_BASE_URL2+'/api/user',
  NAVLIST: API_BASE_URL2+'/api/nav',
  POSTLIST: API_BASE_URL2+'/api/post',
  POSTDETAIL: API_BASE_URL2+'/api/post?pid=',
  COMMENTLIST: API_BASE_URL2+'/api/comment?pid='
}

// module.exports = LOCAL_CONFIG;

module.exports = ONLINE_CONFIG;