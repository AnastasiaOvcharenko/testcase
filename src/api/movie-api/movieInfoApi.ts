import axios from "axios";

export const getMovieInfo = async function (id: number) {
  const apiKey = import.meta.env.VITE_API_TOKEN;
  const apiUrl = `https://api.poiskkino.dev/v1.4/movie/${id}`;
  return axios.get(apiUrl, {
    headers: {
      "x-api-key": apiKey,
    },
  });
};
