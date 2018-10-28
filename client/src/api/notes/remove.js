import axios from "../axios";

function remove(id) {
  return axios({
    method: "DELETE",
    url: `/notes/${id}`
  });
}

export default remove;
