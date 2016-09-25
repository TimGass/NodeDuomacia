let socket = io();
socket.on("time", (data) => {
  console.log("the time is: " + data.time);
});
