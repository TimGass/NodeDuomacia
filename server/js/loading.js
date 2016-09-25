import $ from "jquery";
import moment from "moment";

let local;

if(document.domain === "localhost"){
  local = `${document.location.host}`;
}

let socket = io(local||`${document.domain}:8000`, { 'sync disconnect on unload': true, 'transports': ["websocket"] });
let semicolonIndex = document.cookie.indexOf(";", (document.cookie.match("waitTime").index + 9));
let time;
if(semicolonIndex === -1){
  time = document.cookie.substring((document.cookie.match("waitTime").index + 9));
}
else {
  time = document.cookie.substring((document.cookie.match("waitTime").index + 9), semicolonIndex);
}
let number = 0;
let fullSize = 100;
let endTime;
let startTime;
let difference;
let doOnce = true;
let name;

socket.on("time", (data) => {
  if(doOnce){
    doOnce = false;
    let firstSlash = document.location.pathname.indexOf("/", 1) + 1;
    let lastSlash = document.location.pathname.indexOf("/", firstSlash);
    name = document.location.pathname.substring(firstSlash, lastSlash);
    socket.emit("name", { name: name });
  }
  number++;
  if((fullSize * (((time/1000) - ((time/1000) - number))/(time/1000))) < 100){
    $("img").css("width", (fullSize * (((time/1000) - ((time/1000) - number))/(time/1000))).toString() + "%");
    $(".waitTime").html("Estimated time remaining: " + moment.duration(((time/1000) - number) * 1000).humanize());
  }
  else {
    $("img").css("width", "100%");
    $(".waitTime").html("Estimated time remaining: 0 seconds");
  }
  socket.emit("time", { time: new Date().toTimeString() });
});

socket.on("data", (data) => {
  socket.disconnect();
  if(typeof data === "string"){
    return window.location.href = data;
  }
  $(".form").append(`<textarea name='data'>${JSON.stringify(data.data)}</textarea>`);
  $(".form").trigger("submit");
});
