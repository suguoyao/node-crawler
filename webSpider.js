/**
 * Created by Sugar on 2019-05-27.
 */
var http = require('http');
var fs = require('fs');
var iconv = require('iconv-lite');

function WebSpider(argument) {
  this.url = argument.url;	//开始的页面地址
  this.outpath = argument.outpath || 'g://temp/';
  this.filter = argument.filter || new Filter({
    regex: argument.regex,	//默认过滤所有的图片
    url: argument.url,
    custom: argument.custom
  });
  this.pagin = argument.pagin || false;	//默认不处理
  this.download = argument.download;	//是否立即下载[默认为是true]
  this.page = argument.page || new Page({
    filter: this.filter,		//默认的过滤器
    outpath: this.outpath,		//默认输出路径
    download: this.download		//默认不处理
  });
}

// 开始执行
WebSpider.prototype.start = function () {
  if (this.pagin === false) this.page.getHtml(this.url);
  else this.paginHandle();
};
//处理多页的问题
WebSpider.prototype.paginHandle = function () {
  var _pagin = this.pagin, _urlRule = _pagin.urlRule,
    i = _pagin.start, len = _pagin.end,
    _page = this.page, _url;
  //仅有第一页，需要处理
  _page.getHtml(this.url, 1);
  //处理剩余页
  while (i <= len) {
    _url = _urlRule.replace(/({page})/g, i);
    _page.getHtml(_url, i);
    i++;
  }
};

//过滤对象
function Filter(argument) {
  this.regex = argument.regex || /<img\s.*src="(.*?)"/g;
  this.custom = argument.custom;

  this.domainName = this.tools.getDomain(argument.url);
  this.url = argument.url;
}

Filter.prototype = {
  tools: {
    getDomain: function _getDomain(url) {
      url = url.split('/');
      return url[0] + '//' + url[2];
    },
    getTrueFileUrl: function _getTrueFileUrl(fileUrl, domain) {
      if (fileUrl.indexOf('http') >= 0) return fileUrl;
      return domain + '/' + fileUrl;
      //==================================================================================应该继续处理
    }
  },
  execute: function _execute(html) {
    if (!html) {
      console.log('html is null');
      return;
    }
    //处理过滤条件 或 调用过滤方法
    var arr = [];
    if (typeof (this.custom) == 'function') {/*console.log('file -> custom');*/
      arr = this.custom(html, this.tools.getTrueFileUrl);
    } else {
      console.log('file -> regex');
      arr = this.byRegex(html);
    }
    //return arr.removal();
    return arr;
  },
  byRegex: function _byRegex(html) {
    var results = [], match,
      _regex = this.regex,
      _domain = this.domainName,
      _url = this.url,
      getFilrUrl = this.tools.getTrueFileUrl, i = 1;
    while ((match = _regex.exec(html)) != null) {
      console.log('>>:' + match[1]);
      results.push({src: getFilrUrl(_domain, match[1]), id: i});
      i++;
    }
    return results;
  }
}
//处理页面对象 ，包括获得页面的html -> 根据过滤对象获取所需的内容数组 -> 执行下载或自定义的返回方法
//方法包括：获取一个页面
function Page(argument) {
  this.filter = argument.filter;
  this.outpath = argument.outpath;
  this.download = argument.download;
}

Page.prototype = {
  //获取一页的html
  getHtml: function _getHtml(url, pagei) {
    var self = this, data = null, download = this.download, charset = this.charset;
    http.get(url, function (res) {
      res.setEncoding('binary');
      res.on('data', function (chunk) {
        data += chunk;
      }).on('end', function () {
        var arr = self.filter.execute(iconv.decode(new Buffer(data, 'binary'), 'gbk'));	//保证中文不乱码的问题
        if (download) self.downloadFiles(arr, pagei);
      });
    }).on('error', function () {
      console.log('getHtml is error');
    });
  },
  //下载文件集合，集合必须包含链接
  downloadFiles: function _downloadFiles(arr, pagei) {
    var len, _pagei = pagei || '';
    if (arr && (len = arr.length) > 0) {
      for (var i = 0, _tele; i < len; i++) {
        _tele = arr[i];
        this.downloadFile(_tele.src, this.outpath, _pagei + '_' + _tele.id);
      }
    } else {
      console.log('results is null');
    }
  },
  //下载一个文件
  //outpath 的最后一个字符 必须是/
  //默认多线程下载
  downloadFile: function _downloadFile(src, outpath, _i) {
    var filename = _i + '_' + src.substring(src.lastIndexOf('/') + 1);
    if (!fs.exists(outpath)) fs.mkdir(outpath, 777, function () {
      var writestream = fs.createWriteStream(outpath + filename);
      http.get(src, function (res) {
        try {
          res.pipe(writestream);
          writestream.on('finish', function (e) {
            console.log('download : ' + src);
          }).on('error', function (e) {
            console.log('####download Error:' + src);
          });
        } catch (e) {
          console.log('>>>>#######download error:' + e);
        }

      });
    });
  }
}
module.exports = WebSpider;
