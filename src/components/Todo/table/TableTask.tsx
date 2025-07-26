import {
  CaretDownOutlined,
  CaretRightOutlined,
  HolderOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import type { ITask } from "../../../services/types";
import EditTask from "../editTask/EditTask";
import { CheckSquare, Flag, UsersThree } from "@phosphor-icons/react";
import { CiCircleCheck } from "react-icons/ci";
import { useUpdateTask } from "../../../services/api/todo/tasks-query";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import dayjs from "dayjs";
import { Calendar } from "@phosphor-icons/react";

const TableTask = ({ task }: { task: ITask }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { mutate } = useUpdateTask();
  // DND-kit
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : "1 !important",
    zIndex: isDragging ? 50 : "unset",
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
  const tasksFinished = task.subTasks?.filter((task) => task.finished === true);

  return (
    <>
      <div
        key={task.id}
        ref={setNodeRef}
        style={style}
        className={`px-4 border-y border-border task bg-card !opacity-100 group relative`}
        onClick={() => setIsModalOpen(true)}
      >
        <HolderOutlined className="text-border text-lg" />
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
          <span
            className="me-1"
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
          >
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
          <span className="text-xs ms-1 flex items-center gap-1 font-semibold text-text-light">
            {task.subTasks && task.subTasks?.length > 0 && (
              <>
                <CheckSquare size={18} weight="bold" />
                {tasksFinished?.length}/{task.subTasks?.length}
              </>
            )}
          </span>
        </div>

        {/* Right Side Columns */}
        <ul className="flex list-none text-text border-r border-border font-medium">
          <li className="w-24 text-center py-2 border-r border-border">
            {task.assignee ? (
              <span className=" tag tag-warning">
                {task.assignee.substring(0, 2)}
              </span>
            ) : (
              <UsersThree size={18} />
            )}
          </li>
          <li className="w-28 text-center py-2 border-r border-border">
            {task.dueDate ? (
              dayjs(task.dueDate).format("D MMM'YY")
            ) : (
              <Calendar size={32} />
            )}
          </li>
          <li className="w-24 text-center text-2xl flex justify-center border-r py-2 border-border">
            <Flag
              size={26}
              color={color}
              weight={task.priority === "low" ? "bold" : "fill"}
            />
          </li>
        </ul>
        <div
          className="absolute left-3 top-1/2 bg-background-dark p-1 -translate-y-1/2 opacity-0 group-hover:opacity-100 duration-300 transition-opacity cursor-move"
          {...listeners}
          {...(isDragging ? attributes : {})}
        >
          <HolderOutlined className="text-border text-lg" />
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
            <span
              className="me-1"
              onClick={(e) => {
                e.stopPropagation();
                handleFinish();
              }}
            >
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
              {dayjs(task.dueDate).format("YYYY-MM-DD")}
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
      <EditTask
        task={task}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default TableTask;
