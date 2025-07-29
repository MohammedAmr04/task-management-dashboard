import { Spin } from "antd";
import { useTasksByStatus } from "../../../services/api/todo";
import type { ITask } from "../../../services/types";
import DndProvider from "../shared/DndProvider";
import TableTasks from "./TableTasks";
import { useDebounce } from "use-debounce";
import { useMemo, useState } from "react";
import EditTask from "../shared/editTask/EditTask";
import TodoError from "../shared/TodoError";

const TableView = () => {
  const todo = useTasksByStatus("to-do");
  const progress = useTasksByStatus("in-progress");
  const done = useTasksByStatus("done");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  //use memo
  const allTasks = useMemo(() => {
    return [
      ...(todo?.data || []),
      ...(progress?.data || []),
      ...(done?.data || []),
    ];
  }, [todo?.data, progress?.data, done?.data]);

  console.log("parent");
  const [debouncedLoading] = useDebounce(
    todo.isLoading || progress.isLoading || done.isLoading,
    3000
  );
  //use memo

  if (debouncedLoading) {
    return (
      <div className="flex justify-center py-12">
        <Spin tip="loading" size="large" />
      </div>
    );
  }
  if (todo.isError) {
    return <TodoError error={todo.error} refetch={todo.refetch} />;
  }
  if (progress.isError) {
    return <TodoError error={progress.error} refetch={progress.refetch} />;
  }
  if (done.isError) {
    return <TodoError error={done.error} refetch={done.refetch} />;
  }

  return (
    <section className="max-w-7xl mx-auto">
      <header className="flex flex-col sm:flex-row justify-between items-center px-4 py-2 bg-card rounded-md shadow-sm mb-2">
        <div className="flex-1 font-semibold text-text">To Do Name</div>
        <ul className="flex w-100  list-none gap-5 sm:justify-start  justify-between text-text font-medium">
          <li className="sm:w-24 text-center">Assignee</li>
          <li className="sm:w-28 text-center">Due Date</li>
          <li className="sm:w-24 text-center">Priority</li>
        </ul>
      </header>
      <DndProvider allTasks={allTasks}>
        <TableTasks
          title="To Do"
          onSelect={(task) => setSelectedTask(task)}
          tasks={todo?.data || []}
          status="to-do"
        />
        <TableTasks
          title="In Progress"
          tasks={progress?.data || []}
          status="in-progress"
          onSelect={(task) => setSelectedTask(task)}
        />
        <TableTasks
          onSelect={(task) => setSelectedTask(task)}
          title="Done"
          tasks={done?.data || []}
          status="done"
        />
      </DndProvider>
      {selectedTask && (
        <EditTask
          isOpen={!!selectedTask}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </section>
  );
};

export default TableView;
