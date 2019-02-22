var QrShuffle = function() {
	var 
	codes,
	currentIndex,
	qrCode,
	latestInterval,
	ticker,
	init = function() {
		bindListeners();
		qrcode = new QRCode(document.getElementById("qrcode"), {
			text: "",
			width: 256,
			height: 256,
			colorDark : "#000000",
			colorLight : "#ffffff",
			correctLevel : QRCode.CorrectLevel.H
		});
		parseInput();
	},
	parseInput = function() {
		ticker = 0;
		var rawText = $('#codes-input').text();
		// strip out markup
		$('#codes-input').html(rawText);
		currentIndex = 0;
		codes = rawText.split('\n');
		if(typeof(latestInterval) !== 'undefined') {
			clearInterval(latestInterval);
		}
		latestInterval = setInterval(tick, 150);
		showCurrentCodeAndIncrement();
	},
	tick = function() {
		ticker += 200;
		if(ticker >= 3600) {
			ticker = 0;
			$('#progress-bar')
				.replaceWith('<div id="progress-bar" class="bg-info progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width: 100%"></div>');
			showCurrentCodeAndIncrement();
		}
		else {
			var progress = (3000 - ticker)/30;
			$('#progress-bar')
				.css('width', progress + '%')
				.attr("aria-valuenow", progress);
		}

	},
	showCurrentCodeAndIncrement = function() {
		// strip out markup
		var newMarkup = '';
		for(var i = 0; i < currentIndex; i++) {
			newMarkup += codes[i] + '\n'
		}
		newMarkup += '<mark>' + codes[currentIndex] + '</mark>\n';
		for(var i = currentIndex + 1; i < codes.length; i++) {
			newMarkup += codes[i] + '\n'
		}
		$('#codes-input').html(newMarkup.trim());
		showCode(codes[currentIndex]);
		currentIndex = currentIndex + 1;
		if(currentIndex >= codes.length) {
			currentIndex = 0;
		}
	},
	showCode = function(code) {
		qrcode.makeCode(code);
	},
	bindListeners = function() {
		$('#codes-input').blur(parseInput);
	};
	return {
		init: init
	};
},

qrShuffle;

$(function() {
	qrShuffle = new QrShuffle();
	qrShuffle.init();
});
