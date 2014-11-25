var express = require('express');
var superagent = require('superagent');
var cheerio = require('cheerio');
var app = express();

app.get('/', function (req, res, next) {
  superagent.get('https://cnodejs.org/')
    .end(function (err, sres) {
      if (err) {
        return next(err);
      }
      var $ = cheerio.load(sres.text);
      var items1 = [];
      var items2 = [];
      $('#topic_list .topic_title').each(function (idx, element) {
        var $element = $(element);
        //console.log(idx);
        items1.push({
          title: $element.attr('title'),
          href: $element.attr('href')
        });
      });
      $('#topic_list .user_avatar').each(function (idx, element) {
        var $element = $(element);
        items2.push($element.attr('href').match(/\/user\/(.*)/)[1]);
      });

      for(i=0;i<items1.length;i++)
      {
        items1[i].avatar=items2[i];
      }
      res.send(items1);
    });
});

app.listen(process.env.PORT || 3000);