"use strict";

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _jquery = require("jquery");

var _jquery2 = _interopRequireDefault(_jquery);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

var local = undefined;

if (document.domain === "localhost") {
  local = "" + document.location.host;
}

var socket = io(local || document.domain + ":8000", { 'sync disconnect on unload': true, 'transports': ["websocket"] });
var semicolonIndex = document.cookie.indexOf(";", document.cookie.match("waitTime").index + 9);
var time = undefined;
if (semicolonIndex === -1) {
  time = document.cookie.substring(document.cookie.match("waitTime").index + 9);
} else {
  time = document.cookie.substring(document.cookie.match("waitTime").index + 9, semicolonIndex);
}
var number = 0;
var fullSize = 100;
var endTime = undefined;
var startTime = undefined;
var difference = undefined;
var doOnce = true;
var name = undefined;

socket.on("time", function (data) {
  if (doOnce) {
    doOnce = false;
    var firstSlash = document.location.pathname.indexOf("/", 1) + 1;
    var lastSlash = document.location.pathname.indexOf("/", firstSlash);
    name = document.location.pathname.substring(firstSlash, lastSlash);
    socket.emit("name", { name: name });
  }
  number++;
  if (fullSize * ((time / 1000 - (time / 1000 - number)) / (time / 1000)) < 100) {
    (0, _jquery2["default"])("img").css("width", (fullSize * ((time / 1000 - (time / 1000 - number)) / (time / 1000))).toString() + "%");
    (0, _jquery2["default"])(".waitTime").html("Estimated time remaining: " + _moment2["default"].duration((time / 1000 - number) * 1000).humanize());
  } else {
    (0, _jquery2["default"])("img").css("width", "100%");
    (0, _jquery2["default"])(".waitTime").html("Estimated time remaining: 0 seconds");
  }
  socket.emit("time", { time: new Date().toTimeString() });
});

socket.on("data", function (data) {
  socket.disconnect();
  if (typeof data === "string") {
    return window.location.href = data;
  }
  (0, _jquery2["default"])(".form").append("<textarea name='data'>" + JSON.stringify(data.data) + "</textarea>");
  (0, _jquery2["default"])(".form").trigger("submit");
});
//# sourceMappingURL=loading.js.map