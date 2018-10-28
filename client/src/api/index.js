import create from "./notes/create";
import list from "./notes/list";
import remove from "./notes/remove";
import getOne from "./notes/getOne";
import update from "./notes/update";

const api = {
  notes: {
    create,
    getOne,
    list,
    remove,
    update
  }
};

export default api;
