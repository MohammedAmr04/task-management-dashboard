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
const DndProvider = ({
  children,
  getNewPosition,
}: {
  children: React.ReactNode;
  getNewPosition: (
    taskId: string,
    newStatus: IStatus,
    overId: string | null
  ) => number;
}) => {
  const { mutate } = useUpdateTask();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const taskId = active.id as string;
    const newStatus = over.data.current?.sortable.containerId as IStatus;
    console.log("over", over);
    console.log("over-current", over.data.current?.sortable.containerId);
    console.log("active", active);
    const newPosition = getNewPosition(taskId, newStatus, over?.id as string);
    console.log(newStatus);
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
      delay: 200, // delay before starting drag (ms)
      tolerance: 5, // movement in px before drag starts
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
// function getNewPosition<Number>(event: DragEndEvent) {
//   const { active, over } = event;
//   if (!active || !over || active.id === over.id) return;
//   const overIndex = over.data.current?.sortable.index;
//   if (overIndex === 0) {
//     return ;
//   }
// }
