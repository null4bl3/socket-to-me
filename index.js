const express = require("express");
let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let port = process.env.PORT || 5555;

app.use(express.static("public"));

// app.get('/', (req, res) => {
//   res.sendFile(__dirname + '/index.html');
// });

io.on("connection", socket => {
        socket.on("chat message", msg => {
                io.emit("chat message", msg);
        });
});

http.listen(port, () => {
        console.log("listening on *:" + port);
});
