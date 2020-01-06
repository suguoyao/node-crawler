/**
 * Created by Sugar on 2020/1/4.
 */

var http = require('http');
var request = require('request');
var fs = require('fs');
var cheerio = require('cheerio');
var download = require('download');
var querystring = require('querystring');
let all = []

// var i = 1
for (let i = 1; i < 152; i++) {
  var options = {
    'method': 'GET',
    'url': `https://www.levelcodex.com/tools/ajax/2-pokemon-fusion/?imgm=1&anim=0&mod=0&pkmn1=${i}&pkmn2=${i}&rndm=2`,
    'headers': {}
  };
  request(options, function (error, response) {
    if (error) throw new Error(error);
    var result = JSON.parse(response.body)
    // console.log(result);
    // filter(response.body)
    if (result.imgclr) {
      console.log(i)
      filter(i, result.imgclr)
    }
  });

}


function filter(index, data) {
  //将页面源代码转换为$对象
  var $ = cheerio.load(data);
  var imgUrl = $('img').attr('src')
  // console.log(imgUrl)
  // var bitmap = new Buffer(base64str, 'base64');
  var base64Data = imgUrl.replace(/^data:image\/gif;base64,/, "");

  fs.writeFile('pokemon-gif/' + index + '.gif', base64Data, 'base64', function (err) {
    console.log(err);
  });
}


