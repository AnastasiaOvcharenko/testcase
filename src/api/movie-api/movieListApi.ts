import axios from "axios";

interface Params {
  limit: number;
  next: string;
}

export async function getMoviesByFilters(params: Params) {
  const apiUrl = "https://api.poiskkino.dev/v1.5/movie";
  const apiKey = import.meta.env.VITE_API_TOKEN;
  return axios.get(apiUrl, {
    headers: {
      "x-api-key": apiKey,
    },
    params,
  });
}
