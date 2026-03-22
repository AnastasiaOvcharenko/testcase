const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const apiKey = process.env.API_KEY;
    const apiBaseUrl = "https://api.poiskkino.dev/";

    if (!apiKey) {
      console.error("Нет ключа API");
      return {
        statusCode: 500,
        body: JSON.stringify({ error: "Ошибка сервера" }),
      };
    }

    const { path: _, ...queryParams } = event.queryStringParameters || {};

    const endpoint = event.queryStringParameters?.path || "";

    const url = `${apiBaseUrl}${endpoint}`;

    console.log(`Проксируем в: ${url}`);
    console.log("Query params: ", queryParams);

    const response = await axios({
      method: "GET",
      url: url,
      params: queryParams,
      headers: {
        accept: "application/json, text/plain, */*",
        "x-api-key": apiKey,
      },
      timeout: 30000,
    });

    return {
      statusCode: response.status,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error("Ошибка прокси:", error.message);

    if (error.response) {
      return {
        statusCode: error.response.status,
        body: JSON.stringify({
          error: error.response.data || "Запрос к АПИ не выполнен",
        }),
      };
    } else if (error.request) {
      return {
        statusCode: 504,
        body: JSON.stringify({
          error: "Нет ответа от АПИ",
        }),
      };
    } else {
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: "Ошибка сервера",
        }),
      };
    }
  }
};
