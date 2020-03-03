// timeFormat.js

// 某个时间在当前时间的多久前
// time：即为某个时间的时间戳或日期对象
// onlyDate(Boolean)：是否在超过30天后，只返回日期字符，而不返回时分秒
function timeAgo(time, onlyDate){
  var that = this
  ,arr = [[], []]
  ,stamp = new Date().getTime() - new Date(time).getTime();

  //返回具体日期
  if(stamp > 1000*60*60*24*31){
    stamp =  new Date(time);
    arr[0][0] = that.digit(stamp.getFullYear(), 4);
    arr[0][1] = that.digit(stamp.getMonth() + 1);
    arr[0][2] = that.digit(stamp.getDate());
    
    //是否输出时间
    if(!onlyDate){
      arr[1][0] = that.digit(stamp.getHours());
      arr[1][1] = that.digit(stamp.getMinutes());
      arr[1][2] = that.digit(stamp.getSeconds());
    }
    return arr[0].join('-') + ' ' + arr[1].join(':');
  }

  //30天以内，返回“多久前”
  if(stamp >= 1000*60*60*24){
    return ((stamp/1000/60/60/24)|0) + '天前';
  } else if(stamp >= 1000*60*60){
    return ((stamp/1000/60/60)|0) + '小时前';
  } else if(stamp >= 1000*60*3){ //3分钟以内为：刚刚
    return ((stamp/1000/60)|0) + '分钟前';
  } else if(stamp < 0){
    return '未来';
  } else {
    return '刚刚';
  }
}

// 数字前置补零
// num：原始数字
// length：数字长度，如果原始数字长度小于 length，则前面补零，如：util.digit(7, 3) //007
function digit(num, length){
  var str = '';
  num = String(num);
  length = length || 2;
  for(var i = num.length; i < length; i++){
    str += '0';
  }
  return num < Math.pow(10, length) ? str + (num|0) : num;
}
        
// 转化时间戳或日期对象为日期格式字符
// time：可以是日期对象，也可以是毫秒数
// format：日期字符格式（默认：yyyy-MM-dd HH:mm:ss），可随意定义，如：yyyy年MM月dd日
function toDateString(time, format){
  var that = this
  ,date = new Date(time || new Date())
  ,ymd = [
    that.digit(date.getFullYear(), 4)
    ,that.digit(date.getMonth() + 1)
    ,that.digit(date.getDate())
  ]
  ,hms = [
    that.digit(date.getHours())
    ,that.digit(date.getMinutes())
    ,that.digit(date.getSeconds())
  ];

  format = format || 'yyyy-MM-dd HH:mm:ss';

  return format.replace(/yyyy/g, ymd[0])
  .replace(/MM/g, ymd[1])
  .replace(/dd/g, ymd[2])
  .replace(/HH/g, hms[0])
  .replace(/mm/g, hms[1])
  .replace(/ss/g, hms[2]);
}

// 美化并返回二维数组中指定索引的时间格式
function arrayTimeToFormat(data, indexName = 'p_createat') {
  if (data == {}) return data;
  var that = this
  for (var i = 0; i < data.length; i++ ) {
    data[i][indexName] = that.timeAgo(data[i][indexName]*1000)
  }
  return data
}

// 美化并返回数组中指定索引的时间格式
function timeToFormat(data, indexName = 'p_createat') {
  if (data == {}) return data;
  var that = this
  data[indexName] = that.timeAgo(data[indexName]*1000)
  return data
}

module.exports = {
  timeAgo: timeAgo,
  digit: digit,
  toDateString: toDateString,
  arrayTimeToFormat: arrayTimeToFormat,
  timeToFormat: timeToFormat
};