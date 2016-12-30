# html5-gamepad
Use gamepads consistently across HTML5 browsers

# [test page](https://ericlathrop.github.io/html5-gamepad/)

# example

```javascript
var gamepads = require("html5-gamepad");

function render() {
	var gamepad = gamepads[0];

	var x = gamepad.axis("left stick x");
	if (x < 0) {
		// move left
	}
	if (x > 0) {
		// move right
	}

	if (gamepad.button("a")) {
		// jump
	}

	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
```

# supported gamepads

If a controller is not listed below, it uses the mapping for the Xbox 360 gamepad on Chrome, which may or may not work. Additional mappings can be added to [mappings/index.js](mappings/index.js).

* Logitech Gamepad F310
* Microsoft Xbox 360
* Microsoft Xbox One
* Sony PlayStation 4

# `axis(axis)`

Returns the current position of `axis` for `gamepad`. Axes have a range between
-1.0 and 1.0.

Available axis names are:

* "left stick x"
* "left stick y"
* "right stick x"
* "right stick y"
* "dpad x"
* "dpad y"
* "left trigger"
* "right trigger"

# `button(button)`

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
