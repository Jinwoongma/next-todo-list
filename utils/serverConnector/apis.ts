import ApiConnector from "@/utils/serverConnector/connector";
import { ServerResponse, Todos } from "@/utils/serverConnector/type";

const Apis = {
  geTodoList: (): Promise<ServerResponse<Todos>> => {
    return ApiConnector.get<Todos>({
      url: `todos.json`,
      config: { cache: "no-cache" },
    });
  },
};
export default Apis;
