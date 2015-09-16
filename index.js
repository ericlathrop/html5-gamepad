var buttons = [];

function Gamepad(num) {
	this.num = num;
	this.threshold = 0.001;
	this.axes = [];
	this.buttons = [];
}
Gamepad.prototype.update = function() {
	var gp = navigator.getGamepads();
	if (this.num >= gp.length) {
		return;
	}
	gp = gp[this.num];
	this.axes = gp.axes.slice(0);
	this.buttons = gp.buttons.map(function(button) {
		return button.pressed;
	});
};
Gamepad.prototype.isPressed = function(button) {
	var p = this.axes.reduce(function(pressed, axis) {
		return pressed.concat(axis < -this.threshold, axis > this.threshold);
	}.bind(this), []).concat(this.buttons);

	var debug = p.map(function(b, i) {
		return b ? i.toString() : "-";
	}).join(" ");
	document.getElementById("content").innerHTML = debug;
	return p[button];
};

var g = new Gamepad(0);

function render() {
	g.update();
	g.isPressed(0);
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
