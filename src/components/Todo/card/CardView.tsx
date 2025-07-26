import CardTasks from "./CardTasks";
import { useTasksByStatus } from "../../../services/api/todo/tasks-query";
import DndProvider from "../shared/DndProvider";
import type { IStatus } from "../../../services/types";
import { Spin } from "antd";
import { useDebounce } from "use-debounce";

const CardView = () => {
  const todo = useTasksByStatus("to-do");
  const progress = useTasksByStatus("in-progress");
  const done = useTasksByStatus("done");

  const allTasks = [
    ...(todo?.data || []),
    ...(progress?.data || []),
    ...(done?.data || []),
  ];

  const [debouncedLoading] = useDebounce(
    todo.isLoading || progress.isLoading || done.isLoading,
    3000
  );

  if (debouncedLoading) {
    return (
      <div className="flex justify-center items-center h-80">
        <Spin tip="loading" size="large" />
      </div>
    );
  }

  const getNewPosition = (
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
  if (todo.isError || progress.isError || done.isError) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-red-600">
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          reload
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto py-4">
      <DndProvider getNewPosition={getNewPosition}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardTasks title="To Do" tasks={todo.data || []} status="to-do" />
          <CardTasks
            title="In Progress"
            tasks={progress.data || []}
            status="in-progress"
          />
          <CardTasks title="Done" tasks={done.data || []} status="done" />
        </div>
      </DndProvider>
    </div>
  );
};

export default CardView;
