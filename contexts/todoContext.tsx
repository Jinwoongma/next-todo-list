"use client";

import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useCallback,
  useEffect,
} from "react";
import Apis from "@/utils/serverConnector/apis";
import { TodoInfo, Todos } from "@/utils/serverConnector/type";

// TodosContext에 대한 TypeScript 인터페이스를 정의합니다.
export type TodosContextType = {
  todos: Record<string, TodoInfo>;
  addTodo: (todoContent: string) => Promise<void>;
  toggleCompleteTodo: (todoId: string, completed: boolean) => Promise<void>;
  deleteTodo: (todoId: string) => Promise<void>;
  date: string;
  setDate: (date: string) => void;
};

// TodosContext 초기값 설정
const TodosContext = createContext<TodosContextType | Object>({});

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
  initialDate: string;
}> = ({ children, initialTodos, initialDate }) => {
  const [todos, setTodos] = useState<Todos>(initialTodos || {});
  const [date, setDate] = useState<string>(initialDate);

  // Todo 항목을 가져오는 함수
  const fetchTodos = useCallback(async () => {
    const { data, errorMsg } = await Apis.getTodoList(date);
    if (!errorMsg) {
      setTodos(data || {});
    }
  }, [date]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Todo 항목을 추가하는 함수
  const addTodo = useCallback(
    async (todoContent: string) => {
      if (!todoContent.trim()) return;
      const { errorMsg } = await Apis.addTodo(
        {
          content: todoContent,
          completed: false,
          createTime: new Date(),
        },
        date
      );
      if (!errorMsg) {
        await fetchTodos();
      }
    },
    [date, fetchTodos]
  );

  // Todo 항목의 완료 상태를 토글하는 함수
  const toggleCompleteTodo = useCallback(
    async (todoId: string, completed: boolean) => {
      const { errorMsg } = await Apis.updateTodo(date, todoId, {
        completed,
      });
      if (!errorMsg) {
        await fetchTodos();
      }
    },
    [date, fetchTodos]
  );

  // Todo 항목을 삭제하는 함수
  const deleteTodo = useCallback(
    async (todoId: string) => {
      const { errorMsg } = await Apis.deleteTodo(date, todoId);
      if (!errorMsg) {
        await fetchTodos();
      }
    },
    [date, fetchTodos]
  );

  // TodosContext.Provider를 통해 todos 상태와 함수들을 제공
  return (
    <TodosContext.Provider
      value={{ todos, addTodo, toggleCompleteTodo, deleteTodo, setDate, date }}
    >
      {children}
    </TodosContext.Provider>
  );
};
