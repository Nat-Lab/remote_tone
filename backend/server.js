if(!process.argv[2]) {
	console.error('usage: node ' + process.argv[1] + ' <port>');
	process.exit(1);
}

var express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    actions = [],
    tasks = [],
    port = parseInt(process.argv[2]);

function pushAction(id, action) {
  if(!actions[id]) actions[id] = [];
  if(actions[id].length <= 20) actions[id].push(action);
}

function getAction(id) {
  if(!actions[id] || actions[id].length <= 0) return {action: "none"};
  else return actions[id].pop();
}

function getClientTasks(id) {
  if(!tasks[id]) return [];
  else return tasks[id];
}

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/get', function (req, res) {
  var id = req.query.id;
  if (typeof id !== 'undefined' && id) {
    res.type('application/json');
    var tsk = JSON.stringify(getAction(id));
    console.log("send " + id + " task: " + tsk);
    res.send(tsk);
  } else res.status(500).end();
});

app.get('/get_report', function (req, res) {
  var id = req.query.id;
  if (typeof id !== 'undefined' && id) {
    res.type('application/json');
    var rpt = JSON.stringify(getClientTasks(id));
    console.log("send " + id + " report: " + rpt);
    res.send(rpt);
  } else res.status(500).end();
});

app.post('/control', function (req, res) {
  var id = req.query.id;
  if (typeof id !== 'undefined' && id) {
    try {
      console.log(id + " added task: " + JSON.stringify(req.body));
      pushAction(id, req.body);
      res.status(200).end();
    } catch(e) {
      console.log(e);
      res.status(500).end();
    }
  } else res.status(500).end();
});

app.post('/report', function (req, res) {
  var id = req.query.id;
  if (typeof id !== 'undefined' && id) {
    try {
      console.log(id + " reported: " + JSON.stringify(req.body));
      tasks[id] = req.body;
      res.status(200).end();
    } catch(e) {
      console.log(e);
      res.status(500).end();
    }
  } else res.status(500).end();
});


app.listen(port, function () {
  console.log("nato_play server running on port " + port + ".");
});
