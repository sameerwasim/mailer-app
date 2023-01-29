import { fetchUtils } from "react-admin";
import config from "../../config";

const httpClient = fetchUtils.fetchJson;

const deleteOne = (resource, params) => {
  return httpClient(`${config.apiUrl}${resource}/${params.id}`, {
    method: "DELETE",
    headers: new Headers({ "x-access-token": localStorage.getItem("token") }),
  }).then(({ json }) => ({ data: json }));
};

export default deleteOne;
