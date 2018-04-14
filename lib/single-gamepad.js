var mappings = require("../mappings");
console.log(mappings)
function SingleGamepad(gp) {
  this.gamepad = gp;
  this.mapping = this.detectMapping(gp.id, navigator.userAgent);
}
SingleGamepad.prototype.detectMapping = function(id, browser) {
  for (var i = 0; i < mappings.length; i++) {
    if (isCompatible(mappings[i], id, browser)) {
      console.log("found mapping", mappings[i].name, "for", id, "on", browser);
      return clone(mappings[i]);
    }
  }
  console.warn("no mapping found, using default for", id, "on", browser);
  return clone(mappings[0]);
};
function isCompatible(mapping, id, browser) {
  for (var i = 0; i < mapping.supported.length; i++) {
    var supported = mapping.supported[i];

    if (id.indexOf(supported.id) !== -1
      && browser.indexOf(supported.os) !== -1
      && browser.indexOf(browser) !== -1) {
      return true;
    }
  }
  return false;
}
SingleGamepad.prototype.axis = function(name) {
  var mapping = this.mapping.axes[name];
  if (!mapping) {
    return 0;
  }
  if (mapping.index !== undefined) {
    var index = mapping.index;
    if (mapping.from && mapping.to) {
      var x0 = mapping.from[0]
      var x1 = mapping.from[1]
      var y0 = mapping.to[0]
      var y1 = mapping.to[1]
      var x = this.gamepad.axes[index]
      if (x0 < x1 && y0 < y1) {
        if (x < x0) {
          return y0
        }
        else if (x > x1) {
          return y1
        }
      }
      return y0 + ( (x - x0) * ( (y1 - y0)/(x1 - x0) ) )
    }
    if (mapping.negative) {
      return -this.gamepad.axes[index]
    }
    else {
      return this.gamepad.axes[index];
    }
  }
  if (mapping.buttonAnalog !== undefined) {
    if (typeof this.gamepad.buttons[mapping.buttonAnalog] == "number") {
      return this.gamepad.buttons[mapping.buttonAnalog]
    }
    return this.gamepad.buttons[mapping.buttonAnalog].value
  }
  if (mapping.buttonPositive !== undefined && this.gamepad.buttons[mapping.buttonPositive].pressed) {
    return 1;
  }
  if (mapping.buttonNegative !== undefined && this.gamepad.buttons[mapping.buttonNegative].pressed) {
    return -1;
  }
  return 0;
};
SingleGamepad.prototype.button = function(name) {
  var mapping = this.mapping.buttons[name];
  if (!mapping) {
    return false;
  }
  if (mapping.index !== undefined && this.gamepad.buttons[mapping.index] !== undefined) {
    return this.gamepad.buttons[mapping.index].pressed;
  }
  if (mapping.axis !== undefined) {

    if (mapping.range != undefined) {
      return this.gamepad.axes[mapping.axis] >= mapping.range[0] && this.gamepad.axes[mapping.axis] <= mapping.range[1]
    }

    if (mapping.direction < 0) {
      return this.gamepad.axes[mapping.axis] < -0.75;
    } else {
      return this.gamepad.axes[mapping.axis] > 0.75;
    }
  }
  return false;
};

module.exports = SingleGamepad;

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}
