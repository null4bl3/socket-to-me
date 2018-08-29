import * as axios from "axios";

const BASE_URL = "http://localhost:5555";

function upload(formData) {
  const url = `${BASE_URL}/upload_file`;
  return axios
    .post(url, formData)
    .then((x) => x.data)
    .then((x) => x.map((img) => Object.assign({}, img, { url: `${BASE_URL}/images/${img.id}` })));
}

export { upload };
