var tasks = [];
var offset = 0;
var polling_intv = 500;
var server, ctrl_id;

var natoPlay = (function () {

	var rpc = {

		send : function (task) {
			/* TODO: POST task to server */
		},

		get : function () {
			/* TODO: GET task_element array from server */
		}

	},

	task = {
		add : function(freq, level, intv, dur) {
			rpc.send({
				action: "add",
				task: {
					freq: freq,
					level: level,
					interval: intv,
					duration: dur
				}
			});
		},

		remove : function(id) {
			rpc.send({
				action: "remove",
				id: id
			});
		}
	},

	ui = {
		update : function(tasks) {
			/* TODO: tasks = [task_element, task_element, ...] */
			/*       task_element = {id: id, task: task} */
			/* update the list of running tasks. */
		}
	};

	start = function (url, id) {
		server = url;
		ctrl_id = id;
		window.setInterval(function() {
			ui.update(rpc.get());
		}, polling_intv);
	};

	return {
		task: task,
		rpc : rpc,
		ui : ui,
		start : start
	};

})();
