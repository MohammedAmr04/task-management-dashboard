import { DragOverlay, useDroppable, useDndMonitor } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TableTask from "./TableTask";
import { CaretDownOutlined, CaretRightOutlined } from "@ant-design/icons";
import type { IStatus, ITask } from "../../../services/types";
import { useState } from "react";

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
      <div className="font-medium bg-background-dark py-2 ps-2 rounded-t-xl flex items-center">
        <span className="cursor-pointer me-2" onClick={toggleCaret}>
          {open ? <CaretDownOutlined /> : <CaretRightOutlined />}
        </span>
        {title}
        <span className="ml-2 text-gray-500">({tasks.length})</span>
      </div>

      {open && (
        <div ref={setNodeRef} className="bg-gray-50 rounded-b-xl shadow-sm">
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
        </div>
      )}
    </div>
  );
};

export default TableTasks;
