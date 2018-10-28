import axios from "../axios";

function getOne(id) {
  return axios({
    method: "GET",
    url: `/notes/${id}`
  });
}

export default getOne;
