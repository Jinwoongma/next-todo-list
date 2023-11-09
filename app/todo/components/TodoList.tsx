"use client";
import Apis from "@/utils/serverConnector/apis";
import type { Todos } from "@/utils/serverConnector/type";
import { useRouter } from "next/navigation";

interface Props {
  todos: Todos;
}

export default function TodoList({ todos }: Props) {
  const router = useRouter();

  const handleDeleteTodo = async (todoId: string) => {
    try {
      const { errorMsg } = await Apis.deleteTodo(todoId);
      if (errorMsg) {
        console.error("Error deleting todo:", errorMsg);
      } else {
        console.log(`Todo with id ${todoId} deleted`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  // Todo 리스트 출력 로직
  return (
    <div className="mt-6">
      <ul className="list-disc space-y-2">
        {Object.entries(todos).map(([key, todo]) => (
          <li key={key} className="flex items-center space-x-3">
            <span
              className={`flex-none text-sm ${
                todo.completed ? "text-green-500" : "text-gray-700"
              }`}
            >
              {todo.content}
            </span>
            <span
              className={`flex-grow text-right ${
                todo.completed ? "text-green-500" : "text-red-500"
              }`}
            >
              {todo.completed ? "완료" : "미완료"}
            </span>
            <button
              onClick={() => handleDeleteTodo(key)}
              className="flex-none bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
            >
              삭제
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
