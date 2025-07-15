import {
  CaretDownOutlined,
  CaretRightOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { FaFlag } from "react-icons/fa";
const TableTask = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [finish, setFinish] = useState<boolean>(false);
  const toggleCaret = () => {
    setOpen((prev) => !prev);
  };
  return (
    <div className="flex px-4  border-y border-gray-200  ">
      <div className="flex-1 flex py-2 font-semibold border-r border-gray-200 text-gray-600">
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
        <span className="me-1" onClick={() => setFinish((prev) => !prev)}>
          <CheckCircleOutlined
            className={`text-lg rounded-full ${
              finish ? "bg-primary text-white" : "text-white"
            }`}
            color="#fff"
          />
        </span>
        To Do Name{" "}
        <div className="ms-3">
          <span className="text-white text-xs bg-accent-dark rounded-3xl py-1 px-2.5">
            front
          </span>
        </div>
      </div>

      <ul className="flex list-none  text-gray-500 border-r border-gray-200 font-medium">
        <li className="w-24 text-center py-2 border-r border-gray-200">
          Assignee
        </li>
        <li className="w-28 text-center py-2 border-r border-gray-200">
          Due Date
        </li>
        <li className="w-24 text-center  text-2xl flex justify-center border-r py-2 border-gray-200">
          <FaFlag className="text-amber-950" />
        </li>
      </ul>
    </div>
  );
};

export default TableTask;
