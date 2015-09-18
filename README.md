# html5-gamepad
Use gamepads consistently across HTML5 browsers

## example

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

	if (gamepad.isPressed(0, "a")) {
		// jump
	}

	window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);
```
