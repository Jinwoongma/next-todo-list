"use client";

import { TodosContextType, useTodos } from "@/contexts/todoContext";
import {
  faTrashCan,
  faArrowRotateLeft,
  faCheck,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";
import IconButton from "@/components/IconButton";
import { useEffect, useRef, useState } from "react";
import { TodoInfo } from "@/utils/serverConnector/type";

export default function TodoList({ id, todo }: { id: string; todo: TodoInfo }) {
  const { todos, toggleCompleteTodo, deleteTodo } =
    useTodos() as TodosContextType;
  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const confirmRef = useRef<HTMLLIElement>(null);

  const handleDeleteClick = () => {
    setShowConfirm(true); // 첫 번째 클릭 시 확인 메시지 표시
  };

  const handleConfirmDelete = (id: string) => {
    deleteTodo(id); // 실제 삭제 수행
    setShowConfirm(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      confirmRef.current &&
      !confirmRef.current.contains(event.target as Node)
    ) {
      setShowConfirm(false); // 외부 클릭 감지 시 상태 변경
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <li
      className="flex items-center space-x-3 border-b-[0.5px] border-gray-300 min-h-[48px] overflow-hidden"
      ref={confirmRef}
    >
      <span
        className={`flex-grow w-11/12 break-words py-[12px] ${
          todo.completed ? "italic line-through text-gray-500" : "text-gray-700"
        }`}
        style={{ minWidth: 0 }}
      >
        {todo.content}
      </span>
      <div className="flex-none w-1/12 relative self-stretch">
        <div className="flex items-center justify-center h-full">
          {!showConfirm && (
            <>
              <IconButton
                onClick={() => toggleCompleteTodo(id, !todo.completed)}
                icon={todo.completed ? faArrowRotateLeft : faCheck}
                iconClassName={
                  todo.completed
                    ? "text-slate-500 hover:text-slate-700 w-[20px]"
                    : "text-green-500 hover:text-green-700 w-[20px]"
                }
              />
              <IconButton
                onClick={() => handleDeleteClick()}
                icon={faTrashCan}
                iconClassName="text-red-500 hover:text-red-700 w-[20px]"
              />
            </>
          )}
        </div>
        <IconButton
          onClick={() => handleConfirmDelete(id)}
          icon={faMinus}
          iconClassName="text-white"
          buttonClassName={`absolute top-0 right-0 w-full h-full bg-red-500 transition-opacity duration-200 ${
            showConfirm ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        />
      </div>
    </li>
  );
}
