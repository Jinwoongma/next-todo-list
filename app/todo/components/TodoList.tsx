"use client";

import { useTodos } from "@/contexts/todoContext";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const { todos } = useTodos();

  return (
    <div className="pt-6">
      <ul className="list-disc">
        {Object.entries(todos).map(([key, todo]) => (
          <TodoListItem key={key} id={key} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
