import { useState } from "react";
import TableTask from "./TableTask";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import type { ITask } from "../services/types";

const task: ITask = {
  id: "1",
  title: "Design Landing Page",
  description: "Create a modern UI for the landing page.",
  assignee: "Ahmed",
  dueDate: "2025-07-20",
  priority: "high",
  status: "in-progress",
  finished: false,
  tags: ["design", "UI", "homepage"],
  image: "https://via.placeholder.com/150",
  subTasks: [
    { id: "1-1", title: "Header section", finished: true },
    { id: "1-2", title: "Hero section", finished: false },
  ],
};
const TableTasks = ({ title }: { title: string }) => {
  const [open, setOpen] = useState<boolean>(true);
  const toggleCaret = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="font-medium bg-background-dark py-2 ps-2  rounded-t-xl">
        {!open && (
          <span className="cursor-pointer me-1" onClick={toggleCaret}>
            <CaretRightOutlined />
          </span>
        )}
        {open && (
          <span className="cursor-pointer me-1" onClick={toggleCaret}>
            <CaretDownOutlined />
          </span>
        )}
        {title}
      </div>
      {open && (
        <div>
          <TableTask task={task} />
          <TableTask task={task} />
          <TableTask task={task} />
          <TableTask task={task} />
          <TableTask task={task} />
        </div>
      )}
    </div>
  );
};

export default TableTasks;
