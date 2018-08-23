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

  let app = new Vue({
    el: "#app",
    data: {
      msgs: []
    },
    methods: {
      onCopy: function(e) {
        let toast = this.$toasted.show("COPIED!", {
          theme: "primary",
          position: "top-right",
          duration: 5000
        });
      },
      onError: function(e) {
        let toast = this.$toasted.show("Error Copying Item!", {
          theme: "primary",
          type: "error",
          position: "top-right",
          duration: 5000
        });
      }
    }
  });

  let prune = (item) => {
    app.msgs.push({
      msg: item.message,
      time: item.timestamp
    });
  };
});
