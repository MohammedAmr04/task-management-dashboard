import { useState } from "react";
import TableTask from "./TableTask";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import type { ITask } from "../services/types";

const TableTasks = ({ title, tasks }: { title: string; tasks: ITask[] }) => {
  const [open, setOpen] = useState<boolean>(true);

  const toggleCaret = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="font-medium bg-background-dark py-2 ps-2 rounded-t-xl flex items-center">
        <span className="cursor-pointer me-2" onClick={toggleCaret}>
          {open ? <CaretDownOutlined /> : <CaretRightOutlined />}
        </span>
        {title}
      </div>

      {open && (
        <div>
          {tasks.map((task) => (
            <TableTask key={task.id} task={task} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TableTasks;
