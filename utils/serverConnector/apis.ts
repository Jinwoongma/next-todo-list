import ApiConnector from "@/utils/serverConnector/connector";
import { ServerResponse, TodoInfo, Todos } from "@/utils/serverConnector/type";

const Apis = {
  geTodoList: (): Promise<ServerResponse<Todos>> => {
    return ApiConnector.get<Todos>({
      url: `todos.json`,
      config: { cache: "no-cache" },
      params: {
        orderBy: '"createTime"',
      },
    });
  },

  addTodo: (newTodo: TodoInfo): Promise<ServerResponse<TodoInfo>> => {
    return ApiConnector.post<TodoInfo>({
      url: `todos.json`,
      config: {
        body: JSON.stringify(newTodo),
      },
    });
  },

  deleteTodo: (selectedId: string): Promise<ServerResponse<string>> => {
    return ApiConnector.delete<string>({
      url: `todos/${selectedId}.json`,
      config: {},
    });
  },

  doUpdateTodo: (
    selectedId: string,
    partialUpdateData: object
  ): Promise<ServerResponse<TodoInfo>> => {
    return ApiConnector.patch<TodoInfo>({
      url: `todos/${selectedId}.json`,
      config: {
        body: JSON.stringify(partialUpdateData),
      },
    });
  },
};

export default Apis;
