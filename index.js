var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs')
var path = require('path');
var cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var idAtualProjeto = 1;
var idAtualTarefa = 1;

require('dotenv').config()
app.set('port', (process.env.PORT || 5000));

var salvarProjeto = function (t) {
  let tarefas = carregarProjetos();
  tarefas.push(t);

  for (var i = 0; i < tarefas.length; i++) {
    tarefas[i].id = i;
  }

  fs.writeFileSync('tarefas.json', JSON.stringify(tarefas));
}
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/main.html'));
});

app.get('/tarefas', function(req, res) {
	res.json({ mensagem: 'funcionou!' });
});

app.post('/tarefas', function(req, res) {
	res.json({ mensagem: 'funcionou!' });
});

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});
