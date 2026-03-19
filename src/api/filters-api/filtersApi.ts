import axios from "axios";

export const getFilterValues = async function () {
  const apiKey = import.meta.env.VITE_API_TOKEN;
  const apiUrl = "https://api.poiskkino.dev/v1/movie/possible-values-by-field";
  return axios.get(apiUrl, {
    headers: {
      "x-api-key": apiKey,
    },
    params: {
      field: "genres.name",
    },
  });
};
