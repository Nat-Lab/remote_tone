var UI = (function () {

  update = function (jsonObj) {
    jsonObj.forEach(function(task_element) {
      var id  = task_element.id,
          tsk = task_element.task;
      // update UI view.
    });
  };

  return {
    update: update
  };

})();
