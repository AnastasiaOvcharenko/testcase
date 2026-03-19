import axios, { type AxiosPromise } from "axios";

export const getMovieBySearch = async function (query: string): AxiosPromise {
  const apiKey = import.meta.env.VITE_API_TOKEN;
  const apiUrl = `https://api.poiskkino.dev/v1.4/movie/search`;
  return axios.get(apiUrl, {
    headers: {
      "x-api-key": apiKey,
    },
    params: {
      query: query,
      limit: 50,
    },
  });
};
