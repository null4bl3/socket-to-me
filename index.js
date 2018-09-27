const express = require("express");
let BASE_URL = "";
let LAN_IP = "";
let app = require("express")();
let os = require("os");
let interfaces = os.networkInterfaces();
let http = require("http").Server(app);
let io = require("socket.io")(http);
let path = require("path");
let port = process.env.PORT || 5555;
let moment = require("moment");
let cron = require("node-cron");
let multer = require("multer");
let cors = require("cors");
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./files");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});
let upload = multer({
  storage: storage
});
let message_list = [
  {
    message: "connected ..",
    timestamp: moment().format("YYYY/MM/DD - HH:mm:ss")
  }
];
let addresses = [];

for (let k in interfaces) {
  for (let k2 in interfaces[k]) {
    let address = interfaces[k][k2];
    if (address.family === "IPv4" && !address.internal) {
      if (address.address.includes("192.168")) {
        addresses.push(address.address);
      }
    }
  }
}
if (addresses.length > 0) {
  BASE_URL = "http://" + addresses[0] + ":" + port;
} else {
  BASE_URL = "http://192.168.1.111:5555";
}

app.use(cors());
app.use(express.static("public"));
app.use("/files", express.static(path.join(__dirname, "files")));

app.post("/upload_file", upload.single("file"), (req, res, next) => {
  let tmp = {
    message: BASE_URL + "/files/" + req.file.originalname,
    timestamp: moment().format("YYYY/MM/DD - HH:mm:ss")
  };
  message_list.push(tmp);
  io.emit("chat message", tmp);
  res.send("OK");
});

app.get("/init", (req, res) => {
  res.send(BASE_URL);
});

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
  console.log("\n------------------------------------------");
  console.log("\n => SERVER UP: \t", moment().format("YYYY/MM/DD - HH:mm:ss"));
  console.log(" => BASE_URL: \t " + BASE_URL + "\n");
  console.log("------------------------------------------\n");
  if (process.env.NODE_ENV === "test") {
    process.exit(0);
  }
  if (process.env.NODE_ENV === "PRODUCTION" || process.env.NODE_ENV === "production") {
    cron.schedule("0 0 0 * * *", () => {
      message_list = [
        {
          message: "data reset ..",
          timestamp: moment().format("YYYY/MM/DD - HH:mm:ss")
        }
      ];
    });
  }
});
