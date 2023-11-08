import type { Todos } from "@/utils/serverConnector/type";

interface Props {
  todos: Todos;
}

export default function TodoList({ todos }: Props) {
  // Todo 리스트 출력 로직
  return (
    <ul>
      {Object.entries(todos).map(([key, todo]) => (
        <li key={key}>
          {todo.content} - {todo.completed ? "완료" : "미완료"}
        </li>
      ))}
    </ul>
  );
}
