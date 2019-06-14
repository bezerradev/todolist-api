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
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/projetos', function(req, res) {
  res.json(JSON.parse(fs.readFileSync('projetos.json')));
});


app.get('/tarefas', function(req, res) {
	 res.json(JSON.parse(fs.readFileSync('tarefas.json')));
});

app.post('/projeto', function(req, res) {
  var novaTarefa = {
    id: idAtualTarefa,
    nome: req.body.nome,
    prazo: req.body.prazo,
    dataCriacao: req.body.dataCriacao,
    idProjeto: req.body.idProjeto
  };

  idAtualTarefa++;

  var jsonTarefas = JSON.parse(fs.readFileSync('projeto.json'));

  jsonTarefas.tarefas.push(novaTarefa);

  fs.writeFileSync('projeto.json', JSON.stringify(jsonTarefas));

  res.json(jsonTarefas);
});


app.post('/projeto', function(req, res) {
  var novoProjeto = {
    id: idAtualTarefa,
    nome: req.body.nome,
  };

  idAtualProjeto++;

  var jsonProjetos = JSON.parse(fs.readFileSync('projetos.json'));

  jsonProjetos.tarefas.push(novaTarefa);

  fs.writeFileSync('projetos.json', JSON.stringify(jsonProjetos));

  res.json(jsonProjetos);
});

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});
