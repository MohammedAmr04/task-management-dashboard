export type IPriority = "high" | "medium" | "low";
export type IStatus = "to-do" | "in-progress" | "done";

export interface ISubTask {
  id: string;
  title: string;
  finished: boolean;
}
export interface IComment {
  id: string;
  content: string;
  date: string | Date;
}
export interface ITask {
  id: string;
  title: string;
  description: string;
  assignee?: string | null;
  dueDate?: string | null | Date; // or Date
  priority: IPriority | null;
  status: IStatus;
  position: number;
  finished: boolean;
  comments?: IComment[];
  tags?: string[];
  image?: string; // image URL
  subTasks?: ISubTask[];
}
