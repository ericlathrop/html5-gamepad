var mappings = require("./mappings.json");

window.addEventListener("gamepadconnected", function(e) {
  console.log("Gamepad connected at index %d: %s. %d buttons, %d axes.", e.gamepad.index, e.gamepad.id, e.gamepad.buttons.length, e.gamepad.axes.length);
  gamepads[e.gamepad.index] = new SingleGamepad(e.gamepad);
});

window.addEventListener("gamepaddisconnected", function(e) {
  console.log("Gamepad disconnected from index %d: %s", e.gamepad.index, e.gamepad.id);
  gamepads[e.gamepad.index] = undefined;
});

var gamepads = [];
window.gamepads = gamepads;
module.exports = gamepads;

function SingleGamepad(gp) {
  this.gamepad = gp;
  this.mapping = this.detectMapping();
}
SingleGamepad.prototype.detectMapping = function() {
  return clone(mappings[0]);
};
SingleGamepad.prototype.axis = function(name) {
  var mapping = this.mapping.axes[name];
  if (!mapping) {
    return 0;
  }
  var index = mapping.index;
  return this.gamepad.axes[index];
};
SingleGamepad.prototype.button = function(name) {
  var mapping = this.mapping.buttons[name];
  if (!mapping) {
    return false;
  }
  if (mapping.index !== undefined) {
    return this.gamepad.buttons[mapping.index].pressed;
  }
  if (mapping.axis !== undefined) {
    if (mapping.direction < 0) {
      return this.gamepad.axes[mapping.axis] < -0.75;
    } else {
      return this.gamepad.axes[mapping.axis] > 0.75;
    }
  }
};

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
