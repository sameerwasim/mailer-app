import { fetchUtils } from "react-admin";
import config from "../../config";

const httpClient = fetchUtils.fetchJson;

const update = (resource, params) => {
  params.data = { ...params.data, id: null, created: null, updated: null };

  return httpClient(`${config.apiUrl}${resource}/${params.id}`, {
    method: "PUT",
    body: JSON.stringify(params.data),
    headers: new Headers({ "x-access-token": localStorage.getItem("token") }),
  }).then(({ json }) => ({
    data: { ...params.data, id: json.id },
  }));
};

export default update;
