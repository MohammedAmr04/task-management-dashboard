import { useState } from "react";
import TableTask from "./TableTask";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";

const data = [
  {
    key: "1",
    title: "Onboarding tour for new users",
    tags: ["UX", "Ongoing"],
    assignee: "https://via.placeholder.com/24",
    date: "16 Apr '23",
    priority: "high",
  },
  {
    key: "2",
    title: "Redesign mobile app",
    tags: ["UX Design"],
    assignee: "https://via.placeholder.com/24",
    date: "14 Apr '23",
    priority: "medium",
  },
];

const TableTasks = () => {
  const [open, setOpen] = useState<boolean>(false);
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
        To-Do
      </div>
      {open && (
        <div>
          <TableTask />
        </div>
      )}
    </div>
  );
};

export default TableTasks;
