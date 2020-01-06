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
for (let i = 1; i < 8; i++) {
  var postData = querystring.stringify({
    'ctl00$main$sm': 'ctl00$main$upPager|ctl00$main$anpPager',
    'ctl00$main$hdSent': '发送站内信',
    'ctl00$main$MulSelect': 'P403',
    'ctl00$main$txtCompany': '',
    'ctl00$main$drpHall': '',
    'ctl00$main$txtPrimaryKey': '',
    'ctl00$main$anpPager_input': i === 1 ? 1 : i - 1,
    // 'ctl00$main$anpPager_input': 9,
    'ctl00$main$rptExhibitor$ctl01$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl01$hdflogo': 'bec48fe5-b9b3-4af3-a920-23bf75d265d7.bmp',
    'ctl00$main$rptExhibitor$ctl01$ExhibitorID': 'ff32bb8d-1d6e-4eec-9e23-e7d23f6ee414',
    'ctl00$main$rptExhibitor$ctl02$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl02$hdflogo': '8f01c345-7834-4df1-842b-058de178284d.jpg',
    'ctl00$main$rptExhibitor$ctl02$ExhibitorID': 'ba3369f7-86f6-422e-97a7-95ef971ac237',
    'ctl00$main$rptExhibitor$ctl03$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl03$hdflogo': '76b9c83f-d9bd-4fd6-a7f4-06550f45cbee.png',
    'ctl00$main$rptExhibitor$ctl03$ExhibitorID': 'e3406130-2fda-4c91-917f-9b9aa0eb1069',
    'ctl00$main$rptExhibitor$ctl04$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl04$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl04$ExhibitorID': '7826bb53-6785-484c-9dda-6f73561a7095',
    'ctl00$main$rptExhibitor$ctl05$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl05$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl05$ExhibitorID': '7e04a254-0195-4103-a562-0a7802692591',
    'ctl00$main$rptExhibitor$ctl06$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl06$hdflogo': '19035c52-ad5d-4f45-9ac8-f0810a3ef0cf.jpg',
    'ctl00$main$rptExhibitor$ctl06$ExhibitorID': 'bb993a7c-84da-4cc1-b33b-dcd46be238cf',
    'ctl00$main$rptExhibitor$ctl07$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl07$hdflogo': 'e3a24574-15dd-419b-ad7f-a8b3de54e0ca.jpg',
    'ctl00$main$rptExhibitor$ctl07$ExhibitorID': '29f0e806-1b21-4d68-8df2-12426ab18978',
    'ctl00$main$rptExhibitor$ctl08$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl08$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl08$ExhibitorID': '17e2c89a-0d1c-4255-9837-8209b3335e30',
    'ctl00$main$rptExhibitor$ctl09$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl09$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl09$ExhibitorID': 'a7a306cb-47ea-4f80-8de9-acdad73452fd',
    'ctl00$main$rptExhibitor$ctl10$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl10$hdflogo': '50cc310c-f8b3-4d26-aec7-d20370177598.png',
    'ctl00$main$rptExhibitor$ctl10$ExhibitorID': 'da6c8502-4bca-4904-b639-45c6a5bf3b0d',
    'ctl00$main$rptExhibitor$ctl11$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl11$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl11$ExhibitorID': '2a7a5202-7930-495c-b40e-691ad570932c',
    'ctl00$main$rptExhibitor$ctl12$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl12$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl12$ExhibitorID': '613c3f01-36aa-45e0-8e34-c68a5e0c6432',
    'ctl00$main$rptExhibitor$ctl13$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl13$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl13$ExhibitorID': 'e895fd9b-8e10-4a49-b970-c086d6b5a5a6',
    'ctl00$main$rptExhibitor$ctl14$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl14$hdflogo': '',
    'ctl00$main$rptExhibitor$ctl14$ExhibitorID': '971aa289-5b5a-4be0-8b65-794e988a4d6c',
    'ctl00$main$rptExhibitor$ctl15$ExhibitorType': 'Z',
    'ctl00$main$rptExhibitor$ctl15$hdflogo': '92f0ced5-c8ff-420c-aa51-07030169884d.jpg',
    'ctl00$main$rptExhibitor$ctl15$ExhibitorID': '04281082-7ec0-46ca-bcdf-b1e930069d3e',
    'ctl00$main$anpPager2_input': i === 1 ? 1 : i - 1,
    // 'ctl00$main$anpPager2_input': 9,
    'ctl00$ShareMessage': '',
    'ctl00$ShareUrl': 'http://ali7.infosalons.com.cn/vscenter/exhibitor/login.aspx?f=db7a41bc-0312-439d-a34b-c43be71f1f50',
    '__VIEWSTATE': '/wEPBRI2MzcwNTEwNTY3MDYwMzQwMzhkwCbQ3EjpkgktKumBi4t8V/U2jts=',
    '__VIEWSTATEGENERATOR': 'A767E256',
    '__EVENTTARGET': 'ctl00$main$anpPager',
    '__EVENTARGUMENT': i,
    // '__EVENTARGUMENT': 10,
    '__ASYNCPOST': true
  });
  var options = {
    hostname: 'ali7.infosalons.com.cn',
    port: 80,
    path: '/vscenter/exhibitor/exhibitorlist.aspx?f=db7a41bc-0312-439d-a34b-c43be71f1f50',
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
  if (page === 7) {
    // console.log(all);
    fs.appendFile('/Users/sugars/nodejs/crawler/dianqichuandong.json', JSON.stringify(all), function (err) {
      if (err) console.log("fail " + err);
      else console.log("写入文件ok");
    });
  }
}


