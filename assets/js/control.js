var toneControl = (function () {

	destroy = function (scheduler) {
		window.clearInterval(scheduler);
	};

	create = function(freq, lvl, intv, dur) {
		var fire_intv = intv + dur;
		new Tone.Oscillator({
			"type": "square",
			"frequency" : freq,
			"volume" : lvl
		}).toMaster().start();
		window.setTimeout(function() {
			Tone.Master.mute = true;
		}, dur);
		return window.setInterval(function() {
			window.setTimeout(function() {
				Tone.Master.mute = true;
			}, fire_intv);
			window.setTimeout(function() {
				Tone.Master.mute = false;
			}, intv);
		}, fire_intv);
	};

	return {
		create: create,
		destroy: destroy
	};

})();
