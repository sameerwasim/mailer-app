import queryString from "query-string";
import { fetchUtils } from "react-admin";
import config from "../../config";

const httpClient = fetchUtils.fetchJson;

const deleteMany = (resource, params) => {
  const query = {
    id: JSON.stringify(params.ids).replace("[", "").replace("]", ""),
  };
  return httpClient(`${config.apiUrl}${resource}?${queryString.stringify(query)}`, {
    method: "DELETE",
    headers: new Headers({ "x-access-token": localStorage.getItem("token") }),
  }).then(({ json }) => ({ data: json }));
};

export default deleteMany;
