import axios, { type AxiosPromise } from "axios";

export const getApiCall = async function (
  url: string,
  /* eslint-disable @typescript-eslint/no-explicit-any */
  params?: Record<string, any>,
): AxiosPromise {
  const mode = import.meta.env.VITE_MODE;

  if (mode == "DEPLOY") {
    const proxyUrl = `/.netlify/functions/movie-proxy`;
    return axios.get(proxyUrl, {
      params: {
        path: url,
        ...params,
      },
    });
  } else {
    const apiKey = import.meta.env.VITE_API_TOKEN;
    return axios.get(`https://api.poiskkino.dev/${url}`, {
      headers: {
        "x-api-key": apiKey,
      },
      params,
    });
  }
};
