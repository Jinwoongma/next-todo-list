import React from "react";
import Apis from "@/utils/serverConnector/apis";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import Header from "./components/Header";
import { TodosProvider } from "@/contexts/todoContext";

export default async function todo() {
  const currentDate = new Date().toISOString().split("T")[0];
  const { data, errorMsg, status } = await Apis.getTodoList(currentDate);
  if (errorMsg && status !== 400) {
    return <div>에러 발생: {errorMsg}</div>;
  }

  return (
    <TodosProvider initialTodos={data || {}} initialDate={currentDate}>
      <main className="max-w-lg mx-auto max-h-[640px]">
        <Header />
        <TodoInput />
        <TodoList />
      </main>
    </TodosProvider>
  );
}
