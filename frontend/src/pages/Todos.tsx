import React from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../services/api";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";

const Todos: React.FC = () => {
  const queryClient = useQueryClient();

  const { data: todos, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => (await api.get("/todos")).data,
  });

  const addTodo = useMutation({
    mutationFn: (d: any) => api.post("/todos", d),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const updateTodo = useMutation({
    mutationFn: ({ id, data }: any) => api.put(`/todos/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const deleteTodo = useMutation({
    mutationFn: (id: string) => api.delete(`/todos/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  const toggleTodo = useMutation({
    mutationFn: (id: string) => api.post(`/todos/${id}/toggle`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
  });

  if (isLoading)
    return (
      <div className="text-center text-gray-500 mt-10">Loading Todos...</div>
    );

  return (
    <div className="bg-white p-6 rounded shadow-md mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Your Todos</h2>
      </div>

      <TodoForm onSubmit={(d: any) => addTodo.mutate(d)} />

      <TodoList
        todos={todos}
        onUpdate={(id: string, data: any) =>
          updateTodo.mutate({ id, data })
        }
        onDelete={(id: string) => deleteTodo.mutate(id)}
        onToggle={(id: string) => toggleTodo.mutate(id)}
      />
    </div>
  );
};

export default Todos;
