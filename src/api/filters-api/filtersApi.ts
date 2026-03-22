import type { AxiosPromise } from "axios";
import { getApiCall } from "../apiBase";

export const getFilterValues = async function (): AxiosPromise {
  return getApiCall("v1/movie/possible-values-by-field", {
    field: "genres.name",
  });
};
