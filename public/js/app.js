const BASE_URL = "http://localhost:5555";
const url = `${BASE_URL}/upload_file`;
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
      onCopy: (e) => {
        let toast = this.$toasted.show("COPIED!", {
          theme: "primary",
          position: "top-right",
          duration: 5000
        });
      },
      onError: (e) => {
        let toast = this.$toasted.show("Error Copying Item!", {
          theme: "primary",
          type: "error",
          position: "top-right",
          duration: 5000
        });
      },
      upload: (formData) => {
        let form_data = new FormData();
        form_data.append("file", formData.srcElement.files[0], formData.srcElement.files[0].name);
        axios
          .post(url, form_data)
          .then((data) => {
            form_data = new FormData();
            document.getElementById("file-input").value = "";
          })
          .catch((e) => {
            console.log(e);
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
