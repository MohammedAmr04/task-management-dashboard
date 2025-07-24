import { clientApi } from "../clientApi";
import type { ITask } from "../../types/types";
import { normalizeTask } from "../../utils/utils";

export const getTasks = async (): Promise<ITask[]> => {
  const res = await clientApi.get("/");
  return res.data;
};

export const getTask = async (id: string): Promise<ITask> => {
  const res = await clientApi.get(`/${id}`);
  return res.data;
};

export const getTasksByStatus = async (status: string): Promise<ITask[]> => {
  const res = await clientApi.get(`/?_sort=position&_order=asc`, {
    params: { status },
  });
  return (res.data as ITask[]).slice(0, 5);
};

export const createTask = async (task: Partial<ITask>): Promise<ITask> => {
  const nor = normalizeTask(task);
  const res = await clientApi.post("/", nor);
  return res.data;
};

export const updateTask = async (
  id: string,
  task: Partial<ITask>
): Promise<ITask> => {
  const res = await clientApi.patch(`/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await clientApi.delete(`/${id}`);
};
export const searchTasks = async (query: string): Promise<ITask[]> => {
  if (!query.trim()) return [];

  const res = await clientApi.get("", {
    params: {
      q: query,
    },
  });
  return res.data;
};
