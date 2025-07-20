import { useTasksByStatus } from "../../../services/api/todo";
import type { IStatus } from "../../../services/types";
import DndProvider from "../shared/DndProvider";
import TableTasks from "./TableTasks";

const TableView = () => {
  const todo = useTasksByStatus("to-do");
  const progress = useTasksByStatus("in-progress");
  const done = useTasksByStatus("done");
  const allTasks = [
    ...(todo?.data || []),
    ...(progress?.data || []),
    ...(done?.data || []),
  ];

  const getNewPosition = (
    taskId: string,
    newStatus: IStatus,
    overId: string | null
  ): number => {
    const destinationTasks = allTasks
      .filter((t) => t.status === newStatus && t.id !== taskId)
      .sort((a, b) => a.position - b.position);

    if (!overId || destinationTasks.length === 0) {
      return destinationTasks.length === 0
        ? 1
        : destinationTasks[destinationTasks.length - 1].position + 1;
    }

    const overTask = destinationTasks.find((t) => t.id === overId);
    const overIndex = destinationTasks.findIndex((t) => t.id === overId);

    if (!overTask) return 1;

    const before = destinationTasks[overIndex - 1];
    const after = destinationTasks[overIndex + 1];

    if (before) {
      return (before.position + overTask.position) / 2;
    } else if (after) {
      return (overTask.position + after.position) / 2;
    } else {
      return overTask.position + 1;
    }
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
