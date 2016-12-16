"use strict";

var socket = io();
socket.on("time", function (data) {
  console.log("the time is: " + data.time);
});
//# sourceMappingURL=socket.js.map