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

  const handleCompleteTodo = async (todoId: string, completed: boolean) => {
    try {
      const { data, errorMsg } = await Apis.doUpdateTodo(todoId, {
        completed: completed,
      });
      if (errorMsg) {
        console.error("Error editing todo:", errorMsg);
      } else {
        console.log(`Todo with id ${todoId} edited`);
        router.refresh();
      }
    } catch (error) {
      console.error("Error editing todo:", error);
    }
  };

  // Todo 리스트 출력 로직
  return (
    <div className="mt-6">
      <ul className="list-disc space-y-2">
        {Object.entries(todos).map(([key, todo]) => (
          <li key={key} className="flex items-center space-x-3">
            <span
              className={`flex-grow ${
                todo.completed
                  ? "italic line-through text-gray-500"
                  : "text-gray-700"
              }`}
            >
              {todo.content}
            </span>
            <div className="flex-none">
              <button
                onClick={() => handleCompleteTodo(key, !todo.completed)}
                className={`${
                  todo.completed ? "bg-gray-500" : "bg-green-500"
                } hover:bg-green-700 text-white font-bold py-1 px-2 rounded`}
              >
                {todo.completed ? "미완료" : "완료"}
              </button>
              <button
                onClick={() => handleDeleteTodo(key)}
                className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
              >
                삭제
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
