const express = require("express");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let port = process.env.PORT || 5555;
let timer = require("./timestamp");
let message_list = [
  {
    message: "connected ..",
    timestamp: timer()
  }
];

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    message_list.push({
      message: msg,
      timestamp: timer()
    });
    io.emit("chat message", msg);
  });
  socket.emit("list", message_list);
});

http.listen(port, () => {
  console.log("\nSERVER UP - ", timer());
  console.log("listening on *:" + port + "\n");
  if (process.env.NODE_ENV === "test") {
    process.exit(0);
  }
});
