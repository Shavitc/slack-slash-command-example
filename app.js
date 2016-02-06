var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

var port = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({extended:true}));


app.get('/',function(req,res){
  res.status(200).send('App is Running');
})

app.post('/',function(req,res,next){
  var myIntegrationToken = "SQzKVhi26gnOjNXCf7j1p9lM"; //Your integration token here
  if(req.body.token === myIntegrationToken && req.body.user_name !== 'slackbot'){
    res.status(200).json({
      text:"Thinking of a complement for you..., wait 5 seconds"
    });

    setTimeout(function () {
      postComplement();
    }, 5000);


  }else{
    res.status(405)
    .end();
  }
});


app.listen(port,function(){
  console.log('Listening on Port: ' + port);
})


function postComplement(req,res,next){
  var channelName = req.body.channel_name;
  var text = req.body.text;
  var responseUrl = req.body.response_url;
  var userName = req.body.user_name;

  var complement = userName + " - " + getComplement();

  var bodyPayload = {
    text: complement
  }
  var data = JSON.stringify(bodyPayload);
  var contentLength = data.length;

  request({
    headers: {
      'Content-Length': contentLength,
      'Content-Type': 'application/json'
    },
    uri: responseUrl,
    body: data,
    method: 'POST'
  }, function (err, res, body) {
    if(resonse.statusCode === 200){
      console.log("success");
    }
  });



}


function getComplement(sentFrom, text){
  var complements = [
    'You are looking good today :)',
    'You are the BOSS!!!',
    'Your hair looks wonderful today!',
    'You are such a wonderful developer, you should be working at Google!',
    'I whish I could marry you !!!'
  ];

  var index = Math.floor((Math.random() * (complements.length -1)) + 1);
  return complements[index];
}
