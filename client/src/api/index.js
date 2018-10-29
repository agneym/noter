import create from "./notes/create";
import list from "./notes/list";
import remove from "./notes/remove";
import getOne from "./notes/getOne";
import update from "./notes/update";
import listVersions from "./notes/listVersions";

const api = {
  notes: {
    create,
    getOne,
    list,
    remove,
    update,
    listVersions,
  },
};

export default api;
