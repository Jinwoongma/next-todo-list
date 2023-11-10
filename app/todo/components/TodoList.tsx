"use client";
import { useTodos } from "@/contexts/todoContext";

export default function TodoList() {
  const { todos, toggleCompleteTodo, deleteTodo } = useTodos();
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
                onClick={() => toggleCompleteTodo(key, !todo.completed)}
                className={`${
                  todo.completed ? "bg-gray-500" : "bg-green-500"
                } hover:bg-green-700 text-white font-bold py-1 px-2 rounded`}
              >
                {todo.completed ? "미완료" : "완료"}
              </button>
              <button
                onClick={() => deleteTodo(key)}
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
