var mappings = [
	{
		"id": "Logitech Gamepad F310",
		"userAgent": "Firefox",
		"buttons": [
			{
				"name": "a"
			},
			{
				"name": "b"
			},
			{
				"name": "x"
			},
			{
				"name": "y"
			},
			{
				"name": "left shoulder"
			},
			{
				"name": "right shoulder"
			},
			{
				"name": "back"
			},
			{
				"name": "start"
			},
			{
				"name": "home"
			},
			{
				"name": "left stick"
			},
			{
				"name": "right stick"
			},
		],
		"axes": [
			{
				"name": "left stick x",
				"buttons": [
					"left stick left",
					"left stick right",
				]
			},
			{
				"name": "left stick y",
				"buttons": [
					"left stick up",
					"left stick down",
				]
			},
			{
				"name": "left trigger",
				"buttons": [
					null,
					"left trigger",
				]
			},
			{
				"name": "right stick x",
				"buttons": [
					"right stick left",
					"right stick right",
				]
			},
			{
				"name": "right stick y",
				"buttons": [
					"right stick up",
					"right stick down",
				]
			},
			{
				"name": "right trigger",
				"buttons": [
					null,
					"right trigger",
				]
			},
			{
				"name": "dpad x",
				"buttons": [
					"dpad left",
					"dpad right",
				]
			},
			{
				"name": "dpad y",
				"buttons": [
					"dpad up",
					"dpad down",
				]
			}
		]
	},
	{
		"id": "Logitech Gamepad F310",
		"userAgent": "WebKit",
		"buttons": [
			{
				"name": "a"
			},
			{
				"name": "b"
			},
			{
				"name": "x"
			},
			{
				"name": "y"
			},
			{
				"name": "left shoulder"
			},
			{
				"name": "right shoulder"
			},
			{
				"name": "left trigger",
				"axis": "left trigger",
				"axisValue": 1
			},
			{
				"name": "right trigger",
				"axis": "right trigger",
				"axisValue": 1
			},
			{
				"name": "back"
			},
			{
				"name": "start"
			},
			{
				"name": "left stick"
			},
			{
				"name": "right stick"
			},
			{
				"name": "dpad up",
				"axis": "dpad y",
				"axisValue": -1
			},
			{
				"name": "dpad down",
				"axis": "dpad y",
				"axisValue": 1
			},
			{
				"name": "dpad left",
				"axis": "dpad x",
				"axisValue": -1
			},
			{
				"name": "dpad right",
				"axis": "dpad x",
				"axisValue": 1
			},
			{
				"name": "home"
			},
		],
		"axes": [
			{
				"name": "left stick x",
				"buttons": [
					"left stick left",
					"left stick right",
				]
			},
			{
				"name": "left stick y",
				"buttons": [
					"left stick up",
					"left stick down",
				]
			},
			{
				"name": "right stick x",
				"buttons": [
					"right stick left",
					"right stick right",
				]
			},
			{
				"name": "right stick y",
				"buttons": [
					"right stick up",
					"right stick down",
				]
			}
		]
	}
];

function getMapping(gamepadId, userAgent) {
	return mappings.filter(function(mapping) {
		return gamepadId.indexOf(mapping.id) !== -1 && userAgent.indexOf(mapping.userAgent) !== -1;
	})[0] || mappings[0];
}

function transformButton(mapping, gp, button, i) {
	var mb = mapping.buttons[i] || { name: "button " + i };
	gp.buttons[mb.name] = button.pressed;
	if (mb.axis) {
		if (button.pressed) {
			gp.axes[mb.axis] = mb.axisValue;
		} else if (gp.axes[mb.axis] === undefined) {
			gp.axes[mb.axis] = 0;
		}
	}
	return gp;
}

function transformAxis(mapping, threshold, gp, axis, i) {
	var ma = mapping.axes[i] || { name: "axis " + i };
	gp.axes[ma.name] = axis;
	if (ma.buttons) {
		if (ma.buttons[0] !== null) {
			gp.buttons[ma.buttons[0]] = axis < -threshold;
		}
		if (ma.buttons[1] !== null) {
			gp.buttons[ma.buttons[1]] = axis > threshold;
		}
	}
	return gp;
}

function transformGamepad(threshold, gamepad) {
	var gp = {
		id: gamepad.id,
		buttons: {},
		axes: {}
	};
	var mapping = getMapping(gamepad.id, navigator.userAgent);
	gp = gamepad.buttons.reduce(transformButton.bind(undefined, mapping), gp),
	gp = gamepad.axes.reduce(transformAxis.bind(undefined, mapping, threshold), gp);
	return gp;
}

function isDefined(val) {
	return val !== undefined;
}

function Gamepad() {
	this.threshold = 0.001;
	this.gamepads = [];
}
Gamepad.prototype.update = function() {
	// navigator.getGamepads() returns an array-like object, not an actual object
	// so convert to an array so we can call map()
	//
	// WTF: webkit always returns 4 gamepads, so remove the undefined ones
	var gamepads = Array.prototype.slice.call(navigator.getGamepads()).filter(isDefined);
	this.gamepads = gamepads.map(transformGamepad.bind(undefined, this.threshold));
};
Gamepad.prototype.axis = function(gamepad, axis) {
	if (gamepad >= this.gamepads.length) {
		return 0;
	}
	return this.gamepads[gamepad].axes[axis];
};
Gamepad.prototype.count = function() {
	return this.gamepads.length;
}
Gamepad.prototype.isPressed = function(gamepad, button) {
	if (gamepad >= this.gamepads.length) {
		return false;
	}
	return this.gamepads[gamepad].buttons[button];
};

var g = new Gamepad();

function render() {
	g.update();
	document.getElementById("content").innerHTML = JSON.stringify(g.gamepads, null, 2);
	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
