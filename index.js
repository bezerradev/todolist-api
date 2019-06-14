    
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
// var fs = require('fs')
// var path = require('path');
// var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

require('dotenv').config()
app.set('port', (process.env.PORT || 5000));
app.set('views', __dirname + '/public');

app.get('/', function(req, res) {
	res.json({ mensagem: 'funcionou!' });
});

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});

module.exports = app;