"use client";

import { TodosContextType, useTodos } from "@/contexts/todoContext";
import TodoListItem from "./TodoListItem";

export default function TodoList() {
  const { todos } = useTodos() as TodosContextType;
  const isDataEmpty = todos === null || JSON.stringify(todos) === "{}";

  return (
    <div className="pt-2">
      {isDataEmpty ? (
        <p className="pt-6 flex justify-center">
          해당 날짜에는 할 일이 없습니다.
        </p>
      ) : (
        <ul className="list-disc">
          {Object.entries(todos).map(([key, todo]) => (
            <TodoListItem key={key} id={key} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}
