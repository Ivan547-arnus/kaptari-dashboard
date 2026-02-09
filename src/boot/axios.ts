import { defineBoot } from "#q-app/wrappers";
import axios, { type AxiosInstance } from "axios";
import type { IResponse } from "src/types/IResponse";

declare module "vue" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
    $api: AxiosInstance;
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: process.env.API_URL });

export default defineBoot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

const make = async <T, R = unknown>(
  endpoint: string,
  method: "POST" | "GET" | "PUT" | "DELETE",
  params?: R,
) => {
  try {
    const methods = {
      POST: async () => {
        return await api.post(endpoint, params);
      },
      PUT: async () => {
        return await api.put(endpoint, params);
      },
      DELETE: async () => {
        return await api.delete(endpoint);
      },
      GET: async () => {
        return await api.get(endpoint, { params: params });
      },
    };
    const request = await methods[method]();
    const response = {
      data: { ...request?.data } as IResponse<T>,
      status: request?.status,
    };

    if (response.data.reauth) {
      window.location.href = "/auth";
    }

    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      return {
        data: {
          error: true,
          message: e.response?.data.message || "Hubo un error al conectarse con el servidor",
          exception: e.message,
        } as IResponse<T>,
      };
    }
    return {
      data: {
        error: true,
        message: "Hubo un error al conectarse con el servidor",
        exception: e,
      } as IResponse<T>,
    };
  }
};

export { api, make };
