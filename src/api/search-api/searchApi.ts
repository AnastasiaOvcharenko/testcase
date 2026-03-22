import { type AxiosPromise } from "axios";
import { getApiCall } from "../apiBase";

export const getMovieBySearch = async function (query: string): AxiosPromise {
  return getApiCall(`v1.4/movie/search`, {
    query: query,
    limit: 50,
  });
};
