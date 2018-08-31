let BASE_URL = "";
let message_list = [];

$(() => {
  let socket = io();
  axios
    .get("/init")
    .then((url) => {
      BASE_URL = url.data + "/upload_file";
      console.log("BASE_URL: ", BASE_URL);
    })
    .catch(console.log);

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
        Vue.toasted.success("COPIED!", {
          theme: "primary",
          position: "top-right",
          duration: 5000
        });
      },
      onError: (e) => {
        Vue.toasted.error("Error Copying Item!", {
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
          .post(BASE_URL, form_data)
          .then((data) => {
            form_data = new FormData();
            document.getElementById("file-input").value = "";
            Vue.toasted.success("FILE UPLOADED!", {
              theme: "primary",
              position: "top-right",
              duration: 5000
            });
          })
          .catch((e) => {
            Vue.toasted.error("Upload Failed!", {
              theme: "primary",
              position: "top-right",
              duration: 5000
            });
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
