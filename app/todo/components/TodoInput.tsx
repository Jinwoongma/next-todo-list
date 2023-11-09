"use client";

import Apis from "@/utils/serverConnector/apis";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import TodoInputButton from "./TodoInputButton";
import { usePathname, useRouter } from "next/navigation";

export default function TodoInput() {
  const [inputValue, setInputValue] = useState<string>("");
  const [todos, setTodos] = useState<Object>({});
  const router = useRouter();

  useEffect(() => {
    // Todo 리스트를 가져오는 함수
    const fetchTodos = async () => {
      const { data, errorMsg } = await Apis.geTodoList();
      if (errorMsg) {
        console.error("Error fetching todos:", errorMsg);
        setTodos({});
      } else {
        setTodos(data || {});
      }
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async (todoText: string) => {
    if (!inputValue.trim()) return;

    try {
      const { data, errorMsg } = await Apis.addTodo({
        content: todoText,
        completed: false,
        createTime: new Date(),
      });

      if (!errorMsg) {
        // POST 요청이 성공적으로 완료된 후, 페이지를 새로고침합니다.
        setInputValue("");
        router.refresh();
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  return (
    <div className="flex h-[38px]">
      <label className="relative block w-11/12 h-full">
        <span className="sr-only">Search</span>
        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="h-4 w-4" viewBox="0 0 20 20">
            <FontAwesomeIcon
              icon={faPencil as IconProp}
              className="text-slate-500"
            />
          </svg>
        </span>
        <input
          className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
          placeholder="할일을 입력해주세요.."
          type="text"
          name="search"
          onChange={(e) => setInputValue(e.target.value)}
          value={inputValue}
        />
      </label>
      <TodoInputButton handleOnClick={() => handleAddTodo(inputValue)} />
    </div>
  );
}
