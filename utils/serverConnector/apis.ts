import ApiConnector from "@/utils/serverConnector/connector";
import { ServerResponse, TodoInfo, Todos } from "@/utils/serverConnector/type";

const Apis = {
  getTodoList: async (date: string): Promise<ServerResponse<Todos>> => {
    const response = await ApiConnector.get<Todos>({
      url: `todos/${date}.json`,
      config: { cache: "no-cache" },
      params: {
        orderBy: '"createTime"',
      },
    });
    return response;
  },

  addTodo: (
    newTodo: TodoInfo,
    date: string
  ): Promise<ServerResponse<TodoInfo>> => {
    return ApiConnector.post<TodoInfo>({
      url: `todos/${date}.json`,
      config: {
        body: JSON.stringify(newTodo),
      },
    });
  },

  deleteTodo: (
    date: string,
    selectedId: string
  ): Promise<ServerResponse<string>> => {
    return ApiConnector.delete<string>({
      url: `todos/${date}/${selectedId}.json`,
      config: {},
    });
  },

  updateTodo: (
    date: string,
    selectedId: string,
    partialUpdateData: object
  ): Promise<ServerResponse<TodoInfo>> => {
    return ApiConnector.patch<TodoInfo>({
      url: `todos/${date}/${selectedId}.json`,
      config: {
        body: JSON.stringify(partialUpdateData),
      },
    });
  },
};

export default Apis;
