import firebaseConfig from "@/firebase/firebase-config";
import { ServerResponse } from "./type";

const API_BASE_URL = firebaseConfig.databaseURL;

interface FetchOptions {
  url: string;
  config?: RequestInit;
  params?: Record<string, unknown>;
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
      const searchParams = new URLSearchParams(params as any);
      queryString = `?${searchParams}`;
    }

    const fullConfig: RequestInit = {
      ...config,
      method: "GET",
    };

    return connector<T>({ url: `${url}${queryString}`, config: fullConfig });
  },
  // 다른 HTTP 메서드 (POST, PATCH, DELETE)에 대한 커넥터도 여기에 추가할 수 있습니다.
  // ...
};

export default ApiConnector;
