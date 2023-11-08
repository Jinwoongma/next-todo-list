"use client";
import type { Todos } from "@/utils/serverConnector/type";

interface Props {
  todos: Todos;
}

export default function TodoList({ todos }: Props) {
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
          </li>
        ))}
      </ul>
    </div>
  );
}
