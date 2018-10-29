import axios from "../axios";

/**
 * Create a new Note
 * @param {number} id - Unique ID of note
 * @param {string} title - Title of the note
 * @param {string} text - Complete text of the note
 * @returns {Promise} Promise object containing the updated note and message in data
 */
function update(id, title, text) {
  return axios({
    method: "PUT",
    url: `/notes/${id}`,
    data: {
      title,
      text,
    },
  });
}

export default update;
