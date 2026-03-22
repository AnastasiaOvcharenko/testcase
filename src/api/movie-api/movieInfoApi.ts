import { getApiCall } from "../apiBase";

import type { AxiosPromise } from "axios";

export const getMovieInfo = async function (id?: string): AxiosPromise {
  return getApiCall(`v1.4/movie/${id}`);
};
