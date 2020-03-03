// content.js

const faces = require('face.js');

function escape(html){
  return String(html||'').replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
  .replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&#39;').replace(/"/g, '&quot;');
}

function content(content){
  //支持的html标签
  var html = function(end){
    return new RegExp('\\n*\\['+ (end||'') +'(pre|hr|div|span|p|table|thead|th|tbody|tr|td|ul|li|ol|li|dl|dt|dd|h2|h3|h4|h5)([\\s\\S]*?)\\]\\n*', 'g');
  };
  content = escape(content||'') //XSS
  .replace(/img\[([^\s]+?)\]/g, function(img){  //转义图片
    return '<image src="' + img.replace(/(^img\[)|(\]$)/g, '') + '"></image>';
  }).replace(/@(\S+)(\s+?|$)/g, '@<a href="javascript:;" class="fly-aite">$1</a>$2') //转义@
  .replace(/face\[([^\s\[\]]+?)\]/g, function(face){  //转义表情
    var alt = face.replace(/^face/g, '');
    return '<image alt="'+ alt +'" title="'+ alt +'" src="' + faces[alt] + '"></image>';
  }).replace(/a\([\s\S]+?\)\[[\s\S]*?\]/g, function(str){ //转义链接
    var href = (str.match(/a\(([\s\S]+?)\)\[/)||[])[1];
    var text = (str.match(/\)\[([\s\S]*?)\]/)||[])[1];
    if(!href) return str;
    var rel =  /^(http(s)*:\/\/)\b(?!(\w+\.)*(sentsin.com|layui.com))\b/.test(href.replace(/\s/g, ''));
    return '<a href="'+ href +'" target="_blank"'+ (rel ? ' rel="nofollow"' : '') +'>'+ (text||href) +'</a>';
  }).replace(html(), '\<$1 $2\>').replace(html('/'), '\</$1\>') //转移HTML代码
  .replace(/\n/g, '<br>') //转义换行   
  return content;
}