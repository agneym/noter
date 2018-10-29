import axios from "../axios";

/**
 * Get single note
 * @param {id} number - Unique ID of note
 * @returns {Promise} Promise object containing the note and message in data
 */
function getOne(id) {
  return axios({
    method: "GET",
    url: `/notes/${id}`,
  });
}

export default getOne;
