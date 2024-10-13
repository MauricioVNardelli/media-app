import axios from "axios";
import { cookies } from "next/headers";

export const api = axios.create({
  baseURL: process.env.BACKEND_URL_V1,
});

api.interceptors.request.use(
  async function (config) {
    const cookieStore = cookies();
    const token = cookieStore.get("token");

    if (token && !config.headers["Authorization"]) {
      config.headers["Authorization"] = `Bearer ${token.value}`;
    }

    return config;
  },
  function (error) {
    // Faz alguma coisa com o erro da requisição
    return Promise.reject(error);
  }
);
