import { DragOverlay, useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TableTask from "./TableTask";
import { useState } from "react";
import FormModal from "../form/FormModel";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import type { IStatus, ITask } from "../../../services/types";

const TableTasks = ({
  title,
  tasks,
  status,
}: {
  title: string;
  tasks: ITask[];
  status: IStatus;
}) => {
  const [open, setOpen] = useState<boolean>(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { setNodeRef } = useDroppable({ id: status });
  const [activeTask, setActiveTask] = useState<ITask | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      const id = event.active?.id;
      console.log("id", id);
      console.log("e", event);
      if (id) {
        const found = tasks.find((t) => t.id === id);
        if (found) setActiveTask(found);
      }
    },
    onDragEnd: () => setActiveTask(null),
    onDragCancel: () => setActiveTask(null),
  });

  const toggleCaret = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div className="max-w-7xl mx-auto py-4">
      <div className="font-medium bg-background-dark py-2 ps-2 rounded-t-xl flex items-center justify-between">
        <div className="flex items-center">
          <span className="cursor-pointer me-2" onClick={toggleCaret}>
            {open ? <CaretDownOutlined /> : <CaretRightOutlined />}
          </span>
          {title}
          <span className="ml-2 rounded-full px-1 border border-border bg-card">
            {tasks.length}
          </span>
        </div>
      </div>
      <FormModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        handleOk={() => setIsModalOpen(false)}
        // Pass default status for this table
        initialValues={{ status }}
      />
      {open && (
        <div ref={setNodeRef} className="bg-card rounded-b-xl shadow-sm">
          <SortableContext
            id={status}
            items={tasks}
            strategy={verticalListSortingStrategy}
          >
            {tasks.length === 0 ? (
              <div className="text-center  py-4 text-border">
                No tasks in this column
              </div>
            ) : (
              tasks.map((task) => <TableTask key={task.id} task={task} />)
            )}
          </SortableContext>
          <DragOverlay>
            {activeTask ? (
              <div>
                <TableTask key={`overlay${activeTask.id}`} task={activeTask} />
              </div>
            ) : null}
          </DragOverlay>
          <div
            className={`px-4 border-y border-border task bg-card !opacity-100 group relative`}
          >
            {" "}
            <button
              className=" text-primary px-3 py-2 font-medium rounded hover:bg-primary hover:text-card cursor-pointer duration-300 transition"
              onClick={() => setIsModalOpen(true)}
            >
              + Add Task
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableTasks;
