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
    window.scrollTo(0, document.body.scrollHeight);
  });

  socket.on("list", (list) => {
    list.forEach((item) => {
      prune(item);
    });
  });

  let prune = (item) => {
    $("#messages").append(
      $("<li class='card'>")
        .append($("<b style='font-size: 10px; color: #5858558'>").text(item["timestamp"]))
        .append($("<hr style='margin-top: 5px; margin-bottom: 3px'>"))
        .append($("<p style='font-size: 16px'>").text(item["message"]))
    );
  };
});
