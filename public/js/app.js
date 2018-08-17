let message_list = [];

$(() => {
  let socket = io();

  $("form").submit(() => {
    socket.emit("chat message", $("#m").val());
    $("#m").val("");
    return false;
  });

  socket.on("chat message", (tmp) => {
    prune(tmp);
    // $("#messages").append(
    //   $("<li class='card'>")
    //     .append($("<b style='font-size: 10px; color: #5858558'>").text(tmp.timestamp))
    //     .append($("<p>").text(tmp.message))
    // );
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on("list", (list) => {
    list.forEach((item) => {
      prune(item);
      // $("#messages").append(
      //   $("<li class='card'>")
      //     .append($("<b style='font-size: 10px; color: #5858558'>").text(item["timestamp"]))
      //     .append($("<p style='font-size: 16px'>").text(item["message"]))
      // );
    });
  });

  let prune = (item) => {
    $("#messages").append(
      $("<li class='card'>")
        .append($("<b style='font-size: 10px; color: #5858558'>").text(item["timestamp"]))
        .append($("<hr style='margin-top: -1px; margin-bottom: 1px'>"))
        .append($("<p style='font-size: 16px'>").text(item["message"]))
    );
  };
});
