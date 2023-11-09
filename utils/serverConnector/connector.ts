import firebaseConfig from "@/firebase/firebase-config";
import { ServerResponse } from "./type";

const API_BASE_URL = firebaseConfig.databaseURL;

interface FetchOptions {
  url: string;
  data?: Object;
  config?: RequestInit;
  params?: Record<string, string>;
}

// 커넥터는 서버 응답을 처리하는 제네릭 함수입니다.
const connector = async <T>({
  url,
  config,
}: FetchOptions): Promise<ServerResponse<T>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/${url}`, config);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: T = await response.json();
    return { status: response.status, data: data };
  } catch (error: any) {
    return {
      status: error.status || 500,
      data: null,
      errorMsg: error.message || "An error occurred while fetching data.",
    };
  }
};

const ApiConnector = {
  // GET 요청에 대한 커넥터 함수입니다.
  get: async <T>({
    url,
    config,
    params,
  }: FetchOptions): Promise<ServerResponse<T>> => {
    let queryString = "";
    if (params) {
      const searchParams = new URLSearchParams(params);
      queryString = `?${searchParams}`;
    }

    const fullConfig: RequestInit = {
      ...config,
      method: "GET",
    };

    return connector<T>({ url: `${url}${queryString}`, config: fullConfig });
  },
  post: async <T>({
    url,
    data,
    config,
  }: FetchOptions): Promise<ServerResponse<T>> => {
    const fullConfig: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
      body: JSON.stringify(data),
      ...config,
    };

    return connector<T>({ url, config: fullConfig });
  },

  delete: async <T>({
    url,
    config,
  }: FetchOptions): Promise<ServerResponse<T>> => {
    const fullConfig: RequestInit = {
      method: "DELETE",
      ...config,
    };

    return connector<T>({ url, config: fullConfig });
  },
};

export default ApiConnector;
