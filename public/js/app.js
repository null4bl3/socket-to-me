$(() => {
  let socket = io();
  $("form").submit(() => {
    socket.emit("chat message", $("#m").val());
    $("#m").val("");
    return false;
  });
  socket.on("chat message", (msg) => {
    let t = timer();
    $("#messages").append(
      $("<li class='card'>")
        .append($("<b>").text(t))
        .append($("<p>").text(msg))
    );
    window.scrollTo(0, document.body.scrollHeight);
  });
});

let timer = function() {
  let d = new Date();
  let curr_hour = d.getHours();
  let curr_min = d.getMinutes();
  let curr_sec = d.getSeconds();
  if (curr_sec < 10) {
    curr_sec = "0" + curr_sec;
  }
  if (curr_min < 10) {
    curr_min = "0" + curr_min;
  }
  if (curr_hour < 10) {
    curr_hour = "0" + curr_hour;
  }
  return curr_hour + ":" + curr_min;
};
