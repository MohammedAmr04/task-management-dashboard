export type IPriority = "high" | "medium" | "low";
export type IStatus = "to-do" | "in-progress" | "done";

export interface ISubTask {
  id: string;
  title: string;
  finished: boolean;
}

export interface ITask {
  id: string;
  title: string;
  description?: string;
  assignee: string;
  dueDate: string; // or Date
  priority: IPriority | null;
  status: IStatus;
  finished: boolean;
  tags?: string[];
  image?: string; // image URL
  subTasks?: ISubTask[];
}
