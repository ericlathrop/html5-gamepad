var SingleGamepad = require("./single-gamepad");

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
  gamepads[e.gamepad.index] = new SingleGamepad(e.gamepad);
});

window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
  gamepads[e.gamepad.index] = undefined;
});

var gamepads = [];
module.exports = gamepads;

Array.prototype.slice.call(navigator.getGamepads()).forEach(function(gp) {
  if (!gp) {
    return;
  }
  gamepads[gp.index] = new SingleGamepad(gp);
});
