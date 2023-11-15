export type ServerResponse<T> = {
  status: number;
  data: T | null;
  errorMsg?: string;
};

export interface TodoInfo {
  completed: boolean;
  content: string;
  createTime: Date;
}

export interface Todos {
  [key: string]: TodoInfo;
}

export interface TodosByDate {
  [date: string]: Todos;
}
