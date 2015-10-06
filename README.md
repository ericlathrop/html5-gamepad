# html5-gamepad
Use gamepads consistently across HTML5 browsers

# [test page](https://ericlathrop.github.io/html5-gamepad/)

# example

```javascript
var Gamepad = require("html5-gamepad");
var gamepad = new Gamepad();

function render() {
	gamepad.update();

	var x = gamepad.axis(0, "left stick x");
	if (x < 0) {
		// move left
	}
	if (x > 0) {
		// move right
	}

	if (gamepad.button(0, "a")) {
		// jump
	}

	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
```

# supported gamepads

If a controller is not listed below, it uses the mapping for the Logitech Gamepad F310 on Firefox, which may or may not work. Additional mappings can be added to [mappings.json](mappings.json).

* Logitech Gamepad F310
* Sony PlayStation 4
* Sony PlayStation 3 (Sixaxis / DualShock 3)

# `update()`

Read the current state of the gamepads. You should call this once at the top of your `requestAnimationFrame` callback.

# `count()`

Return the number of connected gamepads.

# `name(gamepad)`

Return the text name of `gamepad`.

# `axis(gamepad, axis)`

Returns the current position of `axis` for `gamepad`.

Available axis names are:

* "left stick x"
* "left stick y"
* "right stick x"
* "right stick y"
* "dpad x"
* "dpad y"
* "left trigger"
* "right trigger"

# `button(gamepad, button)`

Returns `true` if `button` is pressed on `controller`, and `false` otherwise.

Available buttons names are:

* "a"
* "b"
* "x"
* "y"
* "left shoulder"
* "right shoulder"
* "back"
* "start"
* "home"
* "left stick"
* "right stick"
* "left stick x"
* "left stick y"
* "right stick x"
* "right stick y"
* "dpad x"
* "dpad y"
* "left trigger"
* "right trigger"

# Install

With [npm](https://www.npmjs.com/) do:

```
npm install --save html5-gamepad
```

# License

[MIT](LICENSE)
