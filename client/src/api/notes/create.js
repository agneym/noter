import axios from "../axios";

function create(title, text) {
  return axios({
    method: "POST",
    url: "/notes",
    data: {
      title,
      text
    }
  });
}

export default create;
