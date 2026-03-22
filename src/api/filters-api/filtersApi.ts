import { getApiCall } from "../apiBase";

import type { AxiosPromise } from "axios";

export const getFilterValues = async function (): AxiosPromise {
  return getApiCall("v1/movie/possible-values-by-field", {
    field: "genres.name",
  });
};
