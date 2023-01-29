import { fetchUtils } from "react-admin";
import queryString from "query-string";
import config from "../../config";

const httpClient = fetchUtils.fetchJson;

const getMany = (resource, params) => {
  const query = {
    filters: JSON.stringify({ id: params.ids }),
  };
  const url = `${config.apiUrl}${resource}?${queryString.stringify(query)}`;

  return httpClient(url, {
    headers: new Headers({ "x-access-token": localStorage.getItem("token") }),
  }).then(({ headers, json }) => ({
    data: json.data,
    total: json.total,
  }));
};

export default getMany;
