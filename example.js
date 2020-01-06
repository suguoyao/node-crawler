/**
 * Created by Sugar on 2019-05-27.
 */
var fs = require('fs');
var cheerio = require('cheerio');
var webSpider = require('./webSpider');
var downloadZips = [];

function getApk() {
  var ws = new webSpider({
    url: 'http://www.duote.com/android/game.html',	//默认第一页
    pagin: {
      urlRule: 'http://www.duote.com/android/game_0_down_{page}.html',
      start: 1,
      end: 3
    },
    custom: function (html, getpathfun) {	//自定义过滤条件
      var results = [], $ = cheerio.load(html), _this;
      $('.list_item .link').each(function (i) {
        _this = $(this);
        getPageLinks(getpathfun(_this.attr('href'), 'http://www.duote.com/'), i);
      });
      setTimeout(function () {
        writeFile('/Users/sugars/nodejs/crawler/多特apk.txt', downloadZips.join(' '));
      }, 1000);
    },
    download: false
  });
  ws.start();
}

function getPageLinks(url, i) {
  var ws = new webSpider({
    url: url,	//默认第一页
    custom: function (html, getpathfun) {	//自定义过滤条件
      var $ = cheerio.load(html);
      var _regex = /var sUrl = '(.*)';/g, match;
      while ((match = _regex.exec(html)) != null) {
        downloadZips.push('\n' + $('.tit_area h1').text() + "\t\tsrc:" + getpathfun(match[1], 'http://app.2345.cn'));
      }
    }
  });
  ws.start();
}

function writeFile(outpath, str) {
  // 如果用writeFile，那么会删除旧文件，直接写新文件
  fs.appendFile(outpath, str, function (err) {
    if (err) console.log("fail " + err);
    else console.log("写入文件ok");
  });
}

getApk();
