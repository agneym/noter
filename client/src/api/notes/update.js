import axios from "../axios";

function update(id, title, text) {
  return axios({
    method: "POST",
    url: `/notes/${id}`,
    data: {
      title,
      text
    }
  });
}

export default update;
