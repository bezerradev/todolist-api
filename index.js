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

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/projetos', function(req, res) {
  res.json(JSON.parse(fs.readFileSync('projetos.json')));
});


app.get('/tarefas', function(req, res) {
	 res.json(JSON.parse(fs.readFileSync('tarefas.json')));
});

app.post('/tarefa', function(req, res) {
  var novaTarefa = {
    id: idAtualTarefa,
    nome: req.body.nome,
    prazo: req.body.prazo,
    dataCriacao: req.body.dataCriacao,
    selecionada: req.body.selecionada,
    idProjeto: req.body.idProjeto
  };

  idAtualTarefa++;

  var jsonTarefas = JSON.parse(fs.readFileSync('tarefas.json'));

  jsonTarefas.tarefas.push(novaTarefa);

  fs.writeFileSync('tarefas.json', JSON.stringify(jsonTarefas));

  res.json(jsonTarefas);
});

app.post('/tarefas', function(req, res) {
  fs.writeFileSync('tarefas.json', JSON.stringify(req.body));

  res.json({status: "ok"});
});

app.post('/projetos', function(req, res) {
  fs.writeFileSync('projetos.json', JSON.stringify(req.body));

  res.json({status: "ok"});
});


app.post('/projeto', function(req, res) {
  var novoProjeto = {
    id: idAtualTarefa,
    nome: req.body.nome
  };

  idAtualProjeto++;

  var jsonProjetos = JSON.parse(fs.readFileSync('projetos.json'));

  jsonProjetos.projetos.push(novoProjeto);
  
  jsonProjetos.projetoSelecionado = req.body.projetoSelecionado;

  fs.writeFileSync('projetos.json', JSON.stringify(jsonProjetos));

  res.json(jsonProjetos);
});


app.delete('/projeto', function(req, res) {
  var jsonProjetos = JSON.parse(fs.readFileSync('projetos.json'));

  var jsonTarefas = JSON.parse(fs.readFileSync('tarefas.json'))

  jsonProjetos = jsonProjetos.projetos.filter(function(projeto) {
    if (projeto.id != req.body.id) return projeto;
  });

  jsonTarefas = jsonTarefas.tarefas.filter(function(tarefa) {
    if (tarefa.idProjeto != req.body.id) return tarefa;
  });

  fs.writeFileSync('projetos.json', JSON.stringify(jsonProjetos));
  fs.writeFileSync('tarefas.json', JSON.stringify(jsonProjetos));

  res.json(jsonProjetos);
});

app.listen(app.get('port'), function() {
  console.log("Node app running at localhost:" + app.get('port'));
});
