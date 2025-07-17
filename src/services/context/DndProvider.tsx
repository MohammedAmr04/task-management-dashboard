import { closestCenter, DndContext, type DragEndEvent } from "@dnd-kit/core";
import type { IStatus } from "../types";
import { useUpdateTask } from "../api/todo";

const DndProvider = ({ children }: { children: React.ReactNode }) => {
  const { mutate } = useUpdateTask();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(event.active);
    console.log(event.over);

    if (!active || !over) return;

    const taskId = active.id as string;
    const newStatus = over.id as IStatus;

    mutate({
      id: taskId,
      task: { status: newStatus },
    });
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      {children}
    </DndContext>
  );
};

export default DndProvider;
