// Side blob checks
onresize = onload = onpaint = function() {
	if (document.blob3) {
		var contentHeight = document.getElementById("content").offsetHeight;
		// Mozilla swf scale bug fix
		if (navigator.appName.indexOf("Netscape") != -1) document.blob1.width = document.blob3.width = (innerWidth - 600) / 2 - 10;
		if (contentHeight > 1200) document.blob1.height = document.blob3.height = 1200;
	}
};

// Mac IE input size bug fix
if (navigator.userAgent.indexOf("Mac") != -1 && navigator.appName.indexOf("Microsoft") != -1) document.write('<style type="text/css"> input,input.text,textarea { margin:0px; padding:0px; } </style>');

// Ruffle Flash emulator is loaded from the local ruffle/ folder via index.html.

// Link fader for IE, not Opera pretending to be IE
if (navigator.appName.indexOf("Microsoft") != -1 && navigator.userAgent.indexOf("Opera") == -1 && navigator.appVersion.indexOf("Mac") == -1) {
	function mixColor() {
		if (el.tagName != "A") return;

		// Recombine color with white based on ratio
		var r = r1 + (255 - r1) * ratio;
		var g = g1 + (255 - g1) * ratio;
		var b = b1 + (255 - b1) * ratio;

		if (r > 255) r = 255;
		if (g > 255) g = 255;
		if (b > 255) b = 255;

		el.style.color = (r << 16 | g << 8 | b);

		if (ratio < 1 && ratio > 0) {
			window.setTimeout(mixColor, 12);
			ratio += 0.1;
		}
	}

	document.onmouseover = function() {
		el = window.event.srcElement;
		if (el.tagName == "A") {
			// Get anchor element's color
			r1 = g1 = b1 = 0x00;
			if (el.parentNode.tagName == "H1") return;
			if (el.parentNode.id == "copy") col = "#000000";
			else if (document.styleSheets.length > 1) {
				var css = document.styleSheets[1].rules;
				for (var i in css) {
					if (css[i].selectorText == "A") {
						// Split color
						col = css[i].style.color;
						r1 = Number("0x" + col.substr(1, 2));
						g1 = Number("0x" + col.substr(3, 2));
						b1 = Number("0x" + col.substr(5, 2));
						break;
					}
				}
			}
			ratio = 0.1;
			mixColor();
		}
	};

	document.onmouseout = function() {
		if (el.tagName == "A") {
			if (el.parentNode.tagName != "H1") {
				window.clearTimeout();
				ratio = 0;
				el.style.color = col;
			}
		}
	};
}
