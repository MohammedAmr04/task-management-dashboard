import {
  CaretDownOutlined,
  CaretRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { FaFlag } from "react-icons/fa";
import type { ITask } from "../services/types";
import { CiCircleCheck } from "react-icons/ci";
// import type { ITask } from "../services/types/types";

const TableTask = ({ task }: { task: ITask }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const toggleCaret = () => {
    setOpen((prev) => !prev);
  };
  const handleFinish = () => {
    setFinish((prev) => !prev);
  };
  return (
    <div className="px-4  border-y border-border  ">
      <div key={task.id} className="flex ">
        <div className="flex-1 flex py-2 items-center  font-semibold border-r border-border text-text">
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
          <span className="me-1" onClick={handleFinish}>
            {/* <CheckCircleOutlined
              className={`text-lg rounded-full ${
                finish ? "bg-primary text-white" : "text-white"
              }`}
              color="#fff"
            /> */}
            <CiCircleCheck
              className={`text-lg rounded-full ${finish ? "text-primary" : ""}`}
            />
          </span>
          <span className={`${finish ? "line-through text-task-finsih" : ""}`}>
            {task.title}
          </span>
          {task?.tags && task.tags.length > 0 && (
            <div className="ms-3">
              <span className="tag tag-success">{task.tags[0]}</span>
            </div>
          )}
        </div>

        <ul className="flex list-none  text-text border-r border-gray-200 font-medium">
          <li className="w-24 text-center py-2 border-r border-border">
            {task?.assignee}
          </li>
          <li className="w-28 text-center py-2 border-r border-border">
            {task.dueDate}
          </li>
          <li className="w-24 text-center  text-2xl flex justify-center border-r py-2 border-border">
            <FaFlag className="text-amber-950" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableTask;
