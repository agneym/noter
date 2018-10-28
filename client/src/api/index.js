import create from "./notes/create";
import list from "./notes/list";
import remove from "./notes/remove";

const api = {
  notes: {
    create,
    list,
    remove
  }
};

export default api;
