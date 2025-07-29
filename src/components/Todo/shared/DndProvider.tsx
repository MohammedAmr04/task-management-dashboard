import {
  closestCenter,
  DndContext,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { useUpdateTask } from "../../../services/api/todo";
import type { IStatus } from "../../../services/types";
import { restrictToWindowEdges } from "@dnd-kit/modifiers";
import type { ITask } from "./../../../services/types/types";
import { useMemo } from "react";

const DndProvider = ({
  children,
  allTasks,
}: {
  children: React.ReactNode;
  allTasks: ITask[];
}) => {
  const { mutate } = useUpdateTask();
  const getNewPosition = useMemo(() => {
    return (
      taskId: string,
      newStatus: IStatus,
      overId: string | null
    ): number => {
      const destinationTasks = allTasks
        .filter((t) => t.status === newStatus && t.id !== taskId)
        .sort((a, b) => a.position - b.position);

      if (destinationTasks.length === 0) {
        return 1;
      }

      if (!overId) {
        return destinationTasks[destinationTasks.length - 1].position + 1;
      }

      const overIndex = destinationTasks.findIndex((t) => t.id === overId);

      if (overIndex === -1) {
        return destinationTasks[destinationTasks.length - 1].position + 1;
      }

      const before = destinationTasks[overIndex - 1];
      const overTask = destinationTasks[overIndex];
      const after = destinationTasks[overIndex + 1];

      if (!before) {
        return overTask.position - 1;
      }

      if (!after) {
        return overTask.position + 1;
      }

      return (before.position + overTask.position) / 2;
    };
  }, [allTasks]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const taskId = active.id as string;

    const newStatus =
      over.data.current?.sortable?.containerId ?? (over.id as IStatus);

    const newPosition = getNewPosition(
      taskId,
      newStatus,
      over?.id ? String(over.id) : null
    );

    mutate({
      id: taskId,
      task: {
        status: newStatus,
        position: newPosition,
      },
    });
  };

  const pointerSensor = useSensor(PointerSensor, {
    activationConstraint: {
      delay: 100,
      tolerance: 3,
    },
  });

  const sensors = useSensors(pointerSensor);

  return (
    <DndContext
      modifiers={[restrictToWindowEdges]}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      sensors={sensors}
    >
      {children}
    </DndContext>
  );
};

export default DndProvider;
