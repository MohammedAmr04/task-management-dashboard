import type { ISubTask } from "../types";
import type { ITask } from "../types";
import { v4 as uuidv4 } from "uuid";

export const normalizeSubTask = (subTask: Partial<ISubTask>): ISubTask => {
  return {
    id: subTask.id || uuidv4(),
    title: subTask.title || "Untitled Subtask",
    finished: subTask.finished ?? false,
  };
};

export const normalizeSubTasks = (rawSubTasks: unknown): ISubTask[] => {
  if (!rawSubTasks) return [];

  if (Array.isArray(rawSubTasks)) {
    return rawSubTasks.map(normalizeSubTask);
  }

  if (typeof rawSubTasks === "object") {
    return [normalizeSubTask(rawSubTasks as Partial<ISubTask>)];
  }

  return [];
};

export const normalizeTask = (task: Partial<ITask>): ITask => {
  return {
    id: task.id || uuidv4(),
    title: task.title || "Untitled Task",
    description: task.description ?? "",
    assignee: task.assignee || null,
    dueDate: task.dueDate || null,
    priority: task.priority ?? "low",
    status: task.status || "to-do",
    position: task.position ?? 999999,
    finished: task.finished ?? false,
    tags: task.tags ?? [],
    image: task.image ?? "",
    subTasks: normalizeSubTasks(task.subTasks),
  };
};
