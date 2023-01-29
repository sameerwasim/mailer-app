import { fetchUtils } from "react-admin";
import config from "../../config";

const httpClient = fetchUtils.fetchJson;

const create = (resource, params) => {
  return httpClient(`${config.apiUrl}${resource}`, {
    method: "POST",
    body: JSON.stringify(params.data),
    headers: new Headers({ "x-access-token": localStorage.getItem("token") }),
  }).then(({ json }) => ({
    data: { ...params.data, id: json.id },
  }));
};

export default create;
