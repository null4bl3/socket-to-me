const express = require("express");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let port = process.env.PORT || 5555;
let moment = require("moment");
let cron = require("node-cron");
let timer = require("./timestamp");
let message_list = [
  {
    message: "connected ..",
    timestamp: moment().format("YYYY/MM/DD - HH:mm:ss")
  }
];

app.use(express.static("public"));

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    let tmp = {
      message: msg,
      timestamp: moment().format("YYYY/MM/DD - HH:mm:ss")
    };
    message_list.push(tmp);
    io.emit("chat message", tmp);
  });
  socket.emit("list", message_list);
});

http.listen(port, () => {
  console.log("\nSERVER UP - ", timer());
  console.log("listening on *:" + port + "\n");
  if (process.env.NODE_ENV === "PRODUCTION") {
    cron.schedule("0 0 0 * * *", () => {
      message_list = [
        {
          message: "connected ..",
          timestamp: moment().format("YYYY/MM/DD - HH:mm:ss")
        }
      ];
    });
  }
});
