import Apis from "@/utils/serverConnector/apis";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { TodosProvider } from "@/contexts/todoContext";

export default async function todo() {
  const { data, errorMsg } = await Apis.getTodoList();
  if (errorMsg) return <div>에러 발생: {errorMsg}</div>;

  return (
    <TodosProvider initialTodos={data || {}}>
      <main className="max-w-lg mx-auto max-h-[640px]">
        <Header />
        <TodoInput />
        {data ? <TodoList /> : null}
      </main>
    </TodosProvider>
  );
}
