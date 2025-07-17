import {
  CaretDownOutlined,
  CaretRightOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { ITask } from "../services/types";
import { Flag } from "@phosphor-icons/react";
import { CiCircleCheck } from "react-icons/ci";
import { useUpdateTask } from "../services/api/todo/tasks-query";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const TableTask = ({ task }: { task: ITask }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { mutate } = useUpdateTask();
  // DND-kit
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const color =
    task.priority === "low" || task.priority === null
      ? ""
      : task.priority === "medium"
      ? "var(--c-info)"
      : "var(--c-danger)";

  const toggleCaret = () => {
    setOpen((prev) => !prev);
  };

  const handleFinish = () => {
    const updatedFields: Partial<ITask> = {};

    if (task.status === "to-do") {
      updatedFields.status = "in-progress";
    } else if (task.status === "in-progress") {
      updatedFields.status = "done";
    } else if (task.status === "done") {
      updatedFields.finished = true;
    }

    mutate({ id: task.id, task: updatedFields });
  };

  return (
    <div
      key={task.id}
      ref={setNodeRef}
      style={style}
      className="px-4 border-y border-border bg-white group relative"
    >
      <div
        className="absolute left-3 top-1/2 bg-background-dark p-1 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300 transition-opacity cursor-move"
        {...listeners}
        {...attributes}
      >
        <HolderOutlined className="text-gray-400 text-lg" />
      </div>

      <div className="flex">
        {/* Task Title Column */}
        <div className="flex-1 flex py-2 items-center font-semibold border-r border-border text-text pl-6">
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
          <span className="me-1" onClick={() => handleFinish()}>
            <CiCircleCheck
              className={`text-lg rounded-full ${
                task.finished ? "text-primary" : ""
              }`}
            />
          </span>
          <span
            className={`${
              task.finished ? "line-through text-task-finsih" : ""
            }`}
          >
            {task.title}
          </span>
          {task?.tags && task.tags.length > 0 && (
            <div className="ms-3">
              <span className="tag tag-success">{task.tags[0]}</span>
            </div>
          )}
        </div>

        {/* Right Side Columns */}
        <ul className="flex list-none text-text border-r border-border font-medium">
          <li className="w-24 text-center py-2 border-r border-border">
            {task?.assignee}
          </li>
          <li className="w-28 text-center py-2 border-r border-border">
            {task.dueDate}
          </li>
          <li className="w-24 text-center text-2xl flex justify-center border-r py-2 border-border">
            <Flag
              size={26}
              color={color}
              weight={task.priority === "low" ? "bold" : "fill"}
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableTask;
