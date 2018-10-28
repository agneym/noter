import axios from "../axios";

function list() {
  return axios({
    method: "GET",
    url: "/notes"
  });
}

export default list;
