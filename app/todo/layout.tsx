import { TodosProvider } from "@/contexts/todoContext";
import React from "react";

export default function TodoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TodosProvider>{children}</TodosProvider>;
}
