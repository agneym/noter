import axios from "../axios";

/**
 * Get a list of all notes
 * @returns {Promise} Promise object containing notes and message in data
 */
function list(after) {
  return axios({
    method: "GET",
    url: "/notes",
    params: {
      after,
    },
  });
}

export default list;
