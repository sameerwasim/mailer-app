import { fetchUtils } from "react-admin";
import queryString from "query-string";
import config from "../../config";

const httpClient = fetchUtils.fetchJson;

const getOne = (resource, params) => {
  const { id } = params;

  const query = {
    filters: JSON.stringify({ id }),
  };
  console.log(query);
  const url = `${config.apiUrl}${resource}?${queryString.stringify(query)}`;

  return httpClient(url, {
    headers: new Headers({ "x-access-token": localStorage.getItem("token") }),
  }).then(({ headers, json }) => ({
    data: json.data[0],
    // total: json.total,
  }));
};

export default getOne;
