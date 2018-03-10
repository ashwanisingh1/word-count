const express = require('express');
const request = require('request');
const sw = require('stopword');
const app = express();
const sortMap = require('sort-map')
const CircularJSON = require('circular-json');
const port = process.env.PORT || 5000;
var cors = require('cors');
app.use(cors());

const mp=new Map();


request.get('http://terriblytinytales.com/test.txt', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        var text = body;
        var temp;
        var strtemp="";
        var str=[];

         str=text.split(/[\s,]+/);
         //console.log(str);

      for(var i=0;i<str.length;i++)
       {
        str[i]=str[i].toLowerCase();
       }


        //  Comment the next line if you want to include stopwords also
       str=sw.removeStopwords(str);
      for(var i=0;i<str.length;i++)
       {
         mp.set(str[i],0);
       }
       for(var i=0;i<str.length;i++)
        {
          mp.set(str[i],mp.get(str[i])-1);
        //console.log(str[i]);
        }

        var count = [];


    for(var [key, value] of mp.entries()) {
         count.push({
            "word" : key,
            "ctr"  : value
        });

    }
    count.sort(function(a, b) {
          var x = a.ctr; var y = b.ctr;
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
      });
      function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}


            app.param('id', function (req, res, next, id) {
              res.setHeader('Content-Type', 'application/json');
              var temp=[];
              if(id=="")
               {
               res.send(JSON.stringify(temp));
               }
               else {
              for(var i=0;i<Math.min(id,count.length);i++)
               {
                temp.push(count[i]);
               }

              res.send(JSON.stringify(temp));
            }
              next();
            });

            app.get('/api/:id', function (req, res) {

            });
    }

});





app.listen(port, () => console.log(`Listening on port ${port}`));
