import axios, { AxiosInstance, AxiosError, AxiosResponse } from "axios";
import { v4 as uuidv4 } from "uuid";

const axiosClient = (token: string | null = null): AxiosInstance => {
  const headers = token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      }
    : {
        "Content-Type": "application/json; charset=utf-8",
      };
  const apiUrl: string | undefined = process.env.REACT_APP_SERVER_URL;
  const client = axios.create({
    baseURL: apiUrl,
    headers,
    timeout: 60000,
    withCredentials: false,
  });

  client.interceptors.request.use(
    (config: any) => {
      const token = localStorage.getItem("ACCESS_TOKEN");
      config.headers = config.headers || {};
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      // Check if a correlation ID already exists, if not, generate a new one
      config.headers["X-Correlation-ID"] = config.headers["X-Correlation-ID"] || uuidv4();

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      const correlationId = response.config.headers["X-Correlation-ID"];
      if (correlationId) {
        response.headers["X-Correlation-ID"] = correlationId;
      }
      return response;
    },
    (error: AxiosError) => {
      try {
        const { response } = error;
        if (response?.status === 401) {
          localStorage.removeItem("ACCESS_TOKEN");
          //tbd redirect to login page
        }
      } catch (e) {
        console.error(e);
      }
      throw error;
    }
  );

  return client;
};

export default axiosClient;