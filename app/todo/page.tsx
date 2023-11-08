import Apis from "@/utils/serverConnector/apis";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

export default async function todo() {
  const { data, errorMsg } = await Apis.geTodoList();

  if (errorMsg) return <div>에러 발생: {errorMsg}</div>;
  if (!data) return <div>로딩 중...</div>;

  console.log(data);

  return (
    <main>
      <h1>할 일 목록</h1>
      <TodoInput />
      <TodoList todos={data} />
    </main>
  );
}
