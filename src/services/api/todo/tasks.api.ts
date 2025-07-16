import { clientApi } from "../clientApi";
import type { ITask } from "../../types/types";

export const getTasks = async (): Promise<ITask[]> => {
  const res = await clientApi.get("/");
  return res.data;
};

export const getTask = async (id: string): Promise<ITask> => {
  const res = await clientApi.get(`/${id}`);
  return res.data;
};
export const getTasksByStatus = async (status: string): Promise<ITask[]> => {
  const res = await clientApi.get(`/`, { params: { status } });
  // Filter and return only the first 5 tasks with the given status
  return (res.data as ITask[])
    .filter((task) => task.status === status)
    .slice(0, 5);
};
export const createTask = async (task: Partial<ITask>): Promise<ITask> => {
  const res = await clientApi.post("/", task);
  return res.data;
};

export const updateTask = async (
  id: string,
  task: Partial<ITask>
): Promise<ITask> => {
  const res = await clientApi.put(`/${id}`, task);
  return res.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await clientApi.delete(`/${id}`);
};
