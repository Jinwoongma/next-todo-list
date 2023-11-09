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
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      },
    });
  },
};

export default Apis;
