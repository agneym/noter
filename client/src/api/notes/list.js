import axios from "../axios";

/**
 * Get a list of all notes
 * @returns {Promise} Promise object containing notes and message in data
 */
function list() {
  return axios({
    method: "GET",
    url: "/notes",
  });
}

export default list;
