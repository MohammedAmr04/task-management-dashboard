export type Priority = "high" | "medium" | "low";
export type Status = "to-do" | "in-progress" | "done";

export interface SubTask {
  id: string;
  title: string;
  finished: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: string; // or Date
  priority: Priority;
  status: Status;
  finished: boolean;
  tags?: string[];
  image?: string; // image URL
  subTasks?: SubTask[];
}
