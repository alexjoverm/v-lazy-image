var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/vue.js', function(request, response) {
  response.sendFile(path.join(__dirname, '../node_modules/vue/dist/vue.js'));
});

app.get('/plugin.ejs', function(request, response) {
  response.sendFile(path.join(__dirname, '../src/index.js'));
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
