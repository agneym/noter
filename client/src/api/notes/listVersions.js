import axios from "../axios";

/**
 * Get verions of a single note
 * @param {id} number - Unique ID of note
 * @returns {Promise} Promise object containing the note and message in data
 */
function listVersions(id) {
  return axios({
    method: "GET",
    url: `/notes/version/${id}`,
  });
}

export default listVersions;
