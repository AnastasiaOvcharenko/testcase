import axios, { type AxiosPromise } from "axios";

export const getApiCall = async function (
  url: string,
  params?: Record<string, any>,
): AxiosPromise {
  const apiKey = import.meta.env.VITE_API_TOKEN;
  return axios.get(`https://api.poiskkino.dev/${url}`, {
    headers: {
      "x-api-key": apiKey,
    },
    params,
  });
};
