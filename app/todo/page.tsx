import Apis from "@/utils/serverConnector/apis";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Header from "./components/Header";

export default async function todo() {
  const { data, errorMsg } = await Apis.geTodoList();
  if (errorMsg) return <div>에러 발생: {errorMsg}</div>;

  console.log(data);

  return (
    <main className="max-w-lg mx-auto max-h-[640px]">
      <Header />
      <TodoInput />
      {data ? (
        <TodoList todos={data} />
      ) : null}
    </main>
  );
}
