/**
 * Created by Sugar on 2019/9/26.
 */
var http = require('http');
var fs = require('fs');
var cheerio = require('cheerio');
var querystring = require('querystring');
let all = []

var page = 1;
// var i = 1
for (let i = 1; i < 53; i++) {
  var postData = querystring.stringify({
      'ctl00$main$sm': 'ctl00$main$upPager|ctl00$main$anpPager',
      'ctl00$main$hdSent': '发送站内信',
      'ctl00$main$MulSelect': '',
      'ctl00$main$txtCompany': '',
      'ctl00$main$drpHall': '',
      'ctl00$main$txtPrimaryKey': '',
      'ctl00$main$anpPager_input': i === 1 ? 1 : i - 1,
      'ctl00$main$rptExhibitor$ctl01$ExhibitorType': 'IMP99',
      'ctl00$main$rptExhibitor$ctl01$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl01$ExhibitorID': 'eccb2942-c83e-4149-8839-ba848160be70',
      'ctl00$main$rptExhibitor$ctl02$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl02$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl02$ExhibitorID': 'b962887d-3258-4575-9ea7-f3fcd7956f07',
      'ctl00$main$rptExhibitor$ctl03$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl03$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl03$ExhibitorID': '5486fa6c-2f5e-4ca7-ba1e-d16f9e12ba49',
      'ctl00$main$rptExhibitor$ctl04$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl04$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl04$ExhibitorID': '98de6038-d049-40a7-9e71-e2de3b7464ce',
      'ctl00$main$rptExhibitor$ctl05$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl05$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl05$ExhibitorID': '8da47607-256d-47d0-9558-e57b51c2e500',
      'ctl00$main$rptExhibitor$ctl06$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl06$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl06$ExhibitorID': '9acefca1-d218-48ae-beb3-57f2dbd0caa6',
      'ctl00$main$rptExhibitor$ctl07$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl07$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl07$ExhibitorID': '484d9ead-a5d2-4965-a6b9-7d08167fb5f0',
      'ctl00$main$rptExhibitor$ctl08$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl08$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl08$ExhibitorID': '024438d2-7b50-4b3f-ab15-4d42fcbafeb7',
      'ctl00$main$rptExhibitor$ctl09$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl09$hdflogo': '9cde1ec9-5ba0-475c-9b39-f3868c17ee11.jpg',
      'ctl00$main$rptExhibitor$ctl09$ExhibitorID': '4345cd3e-c25f-4827-9c7f-5fd238d99e81',
      'ctl00$main$rptExhibitor$ctl10$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl10$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl10$ExhibitorID': 'bb3d4f65-34f7-4484-a05c-a07fedca8177',
      'ctl00$main$rptExhibitor$ctl11$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl11$hdflogo': '0207fa66-d685-4263-9b10-ffacde1fcdec.JPG',
      'ctl00$main$rptExhibitor$ctl11$ExhibitorID': '3521ffe7-25bd-4940-b28b-30ae829d71c5',
      'ctl00$main$rptExhibitor$ctl12$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl12$hdflogo': '81cea10c-b447-4a7d-a9d4-f5c7d3701d21.jpg',
      'ctl00$main$rptExhibitor$ctl12$ExhibitorID': '43194f4a-d28c-4819-938e-e9ecc69541bb',
      'ctl00$main$rptExhibitor$ctl13$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl13$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl13$ExhibitorID': 'f2456f3c-8be4-48f1-a2f8-08750322d480',
      'ctl00$main$rptExhibitor$ctl14$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl14$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl14$ExhibitorID': '309e90b6-ebb1-4b4a-b516-793f42a18950',
      'ctl00$main$rptExhibitor$ctl15$ExhibitorType': '',
      'ctl00$main$rptExhibitor$ctl15$hdflogo': '',
      'ctl00$main$rptExhibitor$ctl15$ExhibitorID': '8fd94e16-1eb2-4e9e-8585-339c10367243',
      'ctl00$main$anpPager2_input': i === 1 ? 1 : i - 1,
      'ctl00$ShareMessage': '',
      'ctl00$ShareUrl': 'http://ali7.infosalons.com.cn/vscenter/exhibitor/login.aspx?f=cb3e821d-37e5-4a76-8577-50d1fd820067',
      __VIEWSTATE: '/wEPBRI2MzcwNTEwMDY1NjU4NTQ5MDFkWnyam9OpPX/RawKGtH9aBIJLv7E=',
      __VIEWSTATEGENERATOR: 'A767E256',
      __EVENTTARGET: 'ctl00$main$anpPager',
      __EVENTARGUMENT: i,
      __ASYNCPOST: true
    }
  );
  var options = {
    hostname: 'ali7.infosalons.com.cn',
    port: 80,
    path: '/vscenter/exhibitor/exhibitorlist.aspx?f=CB3E821D-37E5-4A76-8577-50D1FD820067',
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': postData.length,
      'cache-control': 'no-cache',
      // 'Content-Length': '3747',
      'Postman-Token': '79c21703-c147-4d2b-9b90-b362e8d6ff21,6f72fa50-faa1-49e8-ae13-12dc5c4d06e8',
      Host: 'ali7.infosalons.com.cn',
      Referer: 'http://ali7.infosalons.com.cn/vscenter/exhibitor/exhibitorlist.aspx?f=db7a41bc-0312-439d-a34b-c43be71f1f50',
      'X-MicrosoftAjax': 'Delta=true',
      Connection: 'keep-alive',
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache',
      Accept: '*/*',
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.132 Safari/537.36',
      'Accept-Language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
      'Accept-Encoding': 'gzip, deflate',
      Origin: 'http://ali7.infosalons.com.cn',
      Cookie: 'ASP.NET_SessionId=3fi1c21cvqqvdfgf5ng0ywx0'
    }
  };
  var req = http.request(options, function (res) {
    var data = '';
    res.setEncoding('utf8');
    res.on('data', function (chunk) {
      data += chunk;
    });
    res.on('end', function () {
      filter(data);
      page++
    })
  });
  req.on('error', (e) => {
    console.log(`problem with request: ${e.message}`);
  });
// write data to request body
  req.write(postData);
  req.end();
}


function filter(data) {
  var result = [];
  //将页面源代码转换为$对象
  var $ = cheerio.load(data);
  var parent = $('[id = "tbVisitor"]').find('tr')
  let sss = parent.not(function (i, el) {
    // this === el
    return $(this).attr('class') === 'companyDes' || $(this).attr('class') === 'companyDesSecond';
  })
  sss.each(function (index, item) {
    let head = $(item).find('th')
    if (head.length === 0) {
      // 公司名
      let companyName = $(item).find('td').eq(1).find('.popmsg').text().trim()

      // 展位号
      let boothNo = $(item).find('td').eq(3).text().trim()
      let o = {
        name: companyName,
        boothNo: boothNo
      }
      all.push(o);
    }

  })
  if (page === 52) {
    console.log(all);
    fs.appendFile('/Users/sugars/nodejs/crawler/result-lk.json', JSON.stringify(all), function (err) {
      if (err) console.log("fail " + err);
      else console.log("写入文件ok");
    });
  }
}


