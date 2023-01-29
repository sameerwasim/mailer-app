import update from "./update";
import create from "./create";
import getList from "./getList";
import getMany from "./getMany";
import getOne from "./getOne";
import deleteOne from "./delete";
import deleteMany from "./deleteMany";

const dataProvider = {
  getList,
  getMany,
  getOne,
  create,
  update,
  delete: deleteOne,
  deleteMany,
};

export default dataProvider;
