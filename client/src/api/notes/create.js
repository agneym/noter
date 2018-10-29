import axios from "../axios";

/**
 * Create a new Note
 * @param {string} title - Title of the note
 * @param {string} text - Complete text of the note
 * @returns {Promise} Promise object containing the created note and message in data
 */
function create(title, text) {
  return axios({
    method: "POST",
    url: "/notes",
    data: {
      title,
      text,
    },
  });
}

export default create;
