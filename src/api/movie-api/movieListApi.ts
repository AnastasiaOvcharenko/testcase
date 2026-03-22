import { type AxiosPromise } from "axios";
import { getApiCall } from "../apiBase";

interface Params {
  limit: number;
  next: string;
}

export async function getMoviesByFilters(params: Params): AxiosPromise {
  return getApiCall(`v1.5/movie`, params);
}
