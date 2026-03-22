import type { AxiosPromise } from "axios";
import { getApiCall } from "../apiBase";

export const getMovieInfo = async function (id?: string): AxiosPromise {
  return getApiCall(`v1.4/movie/${id}`);
};
