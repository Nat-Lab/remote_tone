var UI = (function () {

update = function (jsonObj) {
    var list = document.getElementById('tasklist');
    list.innerHTML = "";
    jsonObj.forEach(function(task_element) {
      var id  = task_element.id,
          tsk = task_element.task,
          p = document.createElement('p'),
          rmbtn = " <button onclick='natoPlay.task.remove(" + id + ")'>X</button>";
      p.innerHTML = "task " + id + ", f: " + tsk.freq + ", l: " + tsk.level + ", i: " + tsk.interval + ", d: " + tsk.duration + rmbtn + "<br>";
      list.appendChild(p);
      
    });
  };


  return {
    update: update
  };

})();
