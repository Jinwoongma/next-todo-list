// import { useState, useEffect } from "react";
// import Apis from "@/utils/serverConnector/apis";
// import { useRouter } from "next/navigation";

// export function useTodos() {
//   const [todos, setTodos] = useState<Object>({});
//   const router = useRouter();

//   useEffect(() => {
//     const fetchTodos = async () => {
//       const { data, errorMsg } = await Apis.getTodoList();
//       if (errorMsg) {
//         console.error("Error fetching todos:", errorMsg);
//       } else {
//         setTodos(data || {});
//       }
//     };

//     fetchTodos();
//   }, []);

//   const refreshTodos = async () => {
//     const { data, errorMsg } = await Apis.getTodoList();
//     if (!errorMsg) {
//       setTodos(data || {});
//     }
//   };

//   const addTodo = async (todoContent: string) => {
//     if (!todoContent.trim()) return;

//     try {
//       const { errorMsg } = await Apis.addTodo({
//         content: todoContent,
//         completed: false,
//         createTime: new Date(),
//       });

//       if (!errorMsg) {
//         await refreshTodos();
//       }
//     } catch (error) {
//       console.error("Error adding todo:", error);
//     }
//   };

//   const toggleCompleteTodo = async (todoId: string, changedvalue: boolean) => {
//     try {
//       const { errorMsg } = await Apis.updateTodo(todoId, {
//         completed: changedvalue,
//       });
//       if (!errorMsg) {
//         await refreshTodos();
//       }
//     } catch (error) {
//       console.error("Error editing todo:", error);
//     }
//   };

//   const deleteTodo = async (todoId: string) => {
//     try {
//       const { errorMsg } = await Apis.deleteTodo(todoId);
//       if (!errorMsg) {
//         await refreshTodos();
//       }
//     } catch (error) {
//       console.error("Error deleting todo:", error);
//     }
//   };

//   return {
//     todos,
//     addTodo,
//     toggleCompleteTodo,
//     deleteTodo,
//   };
// }
