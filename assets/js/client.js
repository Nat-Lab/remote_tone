var tasks = [];
var offset = 0;
var polling_intv = 500;
var server, ctrl_id;

var natoPlay = (function () {

  var rpc = {

    report : function () {
      /* TODO: POST task_element array to server */
    },

    get : function () {
      /* TODO: GET task from server, return the control json. */
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
    window.setInterval(rpc.handler(rpc.get()), polling_intv);
  };

  return {
    task: task,
    rpc : rpc,
    start : start
  };

})();
