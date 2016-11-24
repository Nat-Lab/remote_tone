var tasks = [];
var offset = 0;
var polling_intv = 500;
var url, ctrl_id;

var natoPlay = (function () {

	var rpc = {

		report : function () {
			/* TODO: POST task_element array to server */
		},

		get : function () {
			/* TODO: GET task from server, return the control json. */
		},

		handler : function () {
			var jsonObj = rpc.get();
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
			rpc.report();
		},

		remove : function(id) {
			var new_tasks = [];
			toneControl.destroy(id);
			tasks.forEach(function(_task) {
				if(task.id != id) new_task.push(_task);
			}); // Problem: will natoPlay.report() being execute before forEach() done?
			rpc.report();
		}
	};

	start = function (url, id) {
		
	};

	return {
		task: task,
		rpc : rpc,
		start : start
	};

})();
