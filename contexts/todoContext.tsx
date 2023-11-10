"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
} from "react";
import Apis from "@/utils/serverConnector/apis";
import { TodoInfo, Todos } from "@/utils/serverConnector/type";

// TodosContext에 대한 TypeScript 인터페이스를 정의합니다.
interface TodosContextType {
  todos: Record<string, TodoInfo>;
  addTodo: (todoContent: string) => Promise<void>;
  toggleCompleteTodo: (todoId: string, completed: boolean) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
}

// TodosContext 초기값 설정
const TodosContext = createContext<TodosContextType | null>(null);

// TodosContext의 컨슈머를 위한 커스텀 훅
export function useTodos() {
  const context = useContext(TodosContext);
  if (!context) {
    throw new Error("useTodos must be used within a TodosProvider");
  }
  return context;
}

// TodosProvider 컴포넌트 정의
export const TodosProvider: React.FC<{
  children: ReactNode;
  initialTodos?: Todos;
}> = ({ children, initialTodos }) => {
  const [todos, setTodos] = useState<Todos>(initialTodos || {});

  // Todo 항목을 가져오는 함수
  const fetchTodos = useCallback(async () => {
    const { data, errorMsg } = await Apis.getTodoList();
    if (!errorMsg) {
      setTodos(data || {});
    }
  }, []);

  // Todo 항목을 추가하는 함수
  const addTodo = useCallback(
    async (todoContent: string) => {
      if (!todoContent.trim()) return;
      const { errorMsg } = await Apis.addTodo({
        content: todoContent,
        completed: false,
        createTime: new Date(),
      });
      if (!errorMsg) {
        await fetchTodos();
      }
    },
    [fetchTodos]
  );

  // Todo 항목의 완료 상태를 토글하는 함수
  const toggleCompleteTodo = useCallback(
    async (todoId: string, completed: boolean) => {
      const { errorMsg } = await Apis.updateTodo(todoId, { completed });
      if (!errorMsg) {
        await fetchTodos();
      }
    },
    [fetchTodos]
  );

  // Todo 항목을 삭제하는 함수
  const deleteTodo = useCallback(
    async (todoId: string) => {
      const { errorMsg } = await Apis.deleteTodo(todoId);
      if (!errorMsg) {
        await fetchTodos();
      }
    },
    [fetchTodos]
  );

  // TodosContext.Provider를 통해 todos 상태와 함수들을 제공
  return (
    <TodosContext.Provider
      value={{ todos, addTodo, toggleCompleteTodo, deleteTodo }}
    >
      {children}
    </TodosContext.Provider>
  );
};
