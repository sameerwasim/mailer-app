import { fetchUtils } from "react-admin";
import queryString from "query-string";
import config from "../../config";

const httpClient = fetchUtils.fetchJson;

const getList = (resource, params) => {
  const { page, perPage } = params.pagination;
  const { field, order } = params.sort;

  const query = {
    sort: JSON.stringify([field, order]),
    pagination: JSON.stringify([(page - 1) * perPage, perPage]),
    filters: Object.keys(params.filter).length >= 1 ? JSON.stringify(params.filter) : "",
  };
  const url = `${config.apiUrl}${resource}?${queryString.stringify(query)}`;

  return httpClient(url, {
    headers: new Headers({ "x-access-token": localStorage.getItem("token") }),
  }).then(({ headers, json }) => ({
    data: json.data,
    total: json.total,
  }));
};

export default getList;
