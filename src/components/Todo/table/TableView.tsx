import { Spin } from "antd";
import { useTasksByStatus } from "../../../services/api/todo";
import type { IStatus } from "../../../services/types";
import DndProvider from "../shared/DndProvider";
import TableTasks from "./TableTasks";
import { useDebounce } from "use-debounce";

const TableView = () => {
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
      <div className="flex justify-center py-12">
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

  return (
    <section className="max-w-7xl mx-auto">
      <header className="flex justify-between items-center px-4 py-2 bg-card rounded-md shadow-sm mb-2">
        <div className="flex-1 font-semibold text-text">To Do Name</div>
        <ul className="flex list-none text-text font-medium">
          <li className="w-24 text-center">Assignee</li>
          <li className="w-28 text-center">Due Date</li>
          <li className="w-24 text-center">Priority</li>
        </ul>
      </header>
      <DndProvider getNewPosition={getNewPosition}>
        <TableTasks title="To Do" tasks={todo?.data || []} status="to-do" />
        <TableTasks
          title="In Progress"
          tasks={progress?.data || []}
          status="in-progress"
        />
        <TableTasks title="Done" tasks={done?.data || []} status="done" />
      </DndProvider>
    </section>
  );
};

export default TableView;
