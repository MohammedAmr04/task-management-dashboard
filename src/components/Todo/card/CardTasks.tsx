import type { ITask, IStatus } from "../../../services/types";
import CardTask from "./CardTask";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable, DragOverlay, useDndMonitor } from "@dnd-kit/core";
import { useState } from "react";
import FormModal from "../form/FormModel";
import { PlusOutlined } from "@ant-design/icons";

const CardTasks = ({
  title,
  tasks,
  status,
}: {
  title: string;
  tasks: ITask[];
  status: IStatus;
}) => {
  const { setNodeRef } = useDroppable({ id: status });
  const [activeTask, setActiveTask] = useState<ITask | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useDndMonitor({
    onDragStart: (event) => {
      const id = event.active?.id;
      if (id) {
        const found = tasks.find((t) => t.id === id);
        if (found) setActiveTask(found);
      }
    },
    onDragEnd: () => setActiveTask(null),
    onDragCancel: () => setActiveTask(null),
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-lg">
          {title}{" "}
          <span className="ml-2 rounded-full px-1 border border-border bg-card">
            {tasks.length}
          </span>
        </h2>
        <button
          className=" text-text-light text-2xl cursor-pointer px-3 py-1 "
          onClick={() => setIsModalOpen(true)}
        >
          <PlusOutlined />
        </button>
      </div>

      <FormModal
        isModalOpen={isModalOpen}
        handleCancel={() => setIsModalOpen(false)}
        handleOk={() => setIsModalOpen(false)}
        initialValues={{ status }}
      />

      <div ref={setNodeRef} className="grid grid-cols-1 gap-5 min-h-[120px]">
        <SortableContext
          id={status}
          items={tasks.map((task) => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <div
              className="col-span-1 border-2 rounded-2xl border-dashed min-h-[120px] text-center text-border py-8 flex items-center justify-center"
              data-testid="empty-drop-zone"
            >
              Drop tasks here
            </div>
          ) : (
            tasks.map((task) => <CardTask key={task.id} task={task} />)
          )}
        </SortableContext>

        <DragOverlay>
          {activeTask ? (
            <div
              className="shake"
              style={{
                transform: `rotate(1deg) scale(1.03)`,
                opacity: 0.9,
              }}
            >
              <CardTask key={`overlay-${activeTask.id}`} task={activeTask} />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </div>
  );
};

export default CardTasks;
