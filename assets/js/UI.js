var UI = (function () {

update = function (jsonObj, last_active) {
    console.log(last_active);
    var list = document.getElementById('tasklist'),
        la = document.getElementById('last_active');
    list.innerHTML = "";
    jsonObj.forEach(function(task_element) {
      var id  = task_element.id,
          tsk = task_element.task,
          p = document.createElement('p'),
          rmbtn = " <button onclick='natoPlay.task.remove(" + id + ")'>X</button>";
      p.innerHTML = "task " + id + ", f: " + tsk.freq + ", l: " + tsk.level + ", i: " + tsk.interval + ", d: " + tsk.duration + rmbtn + "<br>";
      list.appendChild(p);
      la.innerHTML = parseInt(last_active) == 0 ? "Never" : ((Date.now() / 1000 | 0) - last_active) + " second(s) ago.";
    });
  };


  return {
    update: update
  };

})();
