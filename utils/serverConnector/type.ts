export type ServerResponse<T> = {
  status: number;
  data: T | null;
  errorMsg?: string;
};

export interface TodoInfo {
  completed: boolean;
  content: string;
}

export interface Todos {
  [key: string]: TodoInfo;
}
