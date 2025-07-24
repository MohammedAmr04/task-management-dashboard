// ...existing code...

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
  getTasksByStatus,
  searchTasks,
} from "./tasks.api";
// React Query hook for searching tasks
export const useSearchTasks = (query: string) => {
  return useQuery<ITask[]>({
    queryKey: ["searchTasks", query],
    queryFn: () => searchTasks(query),
  });
};
import type { IStatus, ITask } from "../../types/types";

export const useTasks = () => {
  return useQuery<ITask[]>({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
};
export const useTasksByStatus = (status: IStatus) => {
  return useQuery<ITask[]>({
    queryKey: ["tasks", status],
    queryFn: () => getTasksByStatus(status),
  });
};
export const useTask = (id: string) => {
  return useQuery<ITask>({
    queryKey: ["task", id],
    queryFn: () => getTask(id),
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, task }: { id: string; task: Partial<ITask> }) =>
      updateTask(id, task),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};

export const useDeleteTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
};
