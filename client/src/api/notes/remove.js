import axios from "../axios";

/**
 * Delete a note
 * @param {number} id - Unique ID of note
 * @returns {Promise} Promise object containing the deleted note and message in data
 */
function remove(id) {
  return axios({
    method: "DELETE",
    url: `/notes/${id}`,
  });
}

export default remove;
