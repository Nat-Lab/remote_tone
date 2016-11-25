var tasks = [];
var polling_intv = 500;
var server, ctrl_id;

var natoPlay = (function () {

  var rpc = {

    report : function () {
      var http = new XMLHttpRequest(),
          url = server + "/report?id=" + ctrl_id;
      http.open("POST", url);
      http.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
      http.send(JSON.stringify(tasks));
    },

    get : function (callback) {
      var http = new XMLHttpRequest(),
          url = server + "/get?id=" + ctrl_id;
      http.open("GET", url);
      http.send();
      http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
          callback(JSON.parse(http.responseText));
        }
      };
    },

    handler : function (jsonObj) {
      if(jsonObj.action == "add") {
        task.add(jsonObj.task);
      }
      if(jsonObj.action == "remove") {
        task.remove(jsonObj.id);
      }
    }

  },

  task = {
    add : function(task_object) {
      var id = toneControl.create(
        task_object.freq, 
        task_object.level, 
        task_object.interval, 
        task_object.duration
      );
      tasks.push({id: id, task: task_object});
      UI.update(tasks);
      rpc.report();
    },

    remove : function(id) {
      var new_tasks = [];
      toneControl.destroy(id);
      tasks.forEach(function(_task) {
        if(task.id != id) new_tasks.push(_task);
      }); 
      tasks = new_tasks;
      rpc.report();
      UI.update(tasks);
    }
  };

  start = function (url, id) {
    server = url;
    ctrl_id = id;
    window.setInterval(function() { rpc.get(rpc.handler); }, polling_intv);
  };

  return {
    task: task,
    rpc : rpc,
    start : start
  };

})();
