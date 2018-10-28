import create from "./notes/create";
import list from "./notes/list";
import remove from "./notes/remove";
import getOne from "./notes/getOne";

const api = {
  notes: {
    create,
    list,
    remove,
    getOne
  }
};

export default api;
