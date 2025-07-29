import CardTasks from "./CardTasks";
import { useTasksByStatus } from "../../../services/api/todo/tasks-query";
import DndProvider from "../shared/DndProvider";
import { Spin } from "antd";
import { useDebounce } from "use-debounce";
import { useMemo, useState } from "react";
import TodoError from "../shared/TodoError";
import type { ITask } from "../../../services/types";
import EditTask from "../shared/editTask/EditTask";

const CardView = () => {
  const todo = useTasksByStatus("to-do");
  const progress = useTasksByStatus("in-progress");
  const done = useTasksByStatus("done");
  const [selectedTask, setSelectedTask] = useState<ITask | null>(null);

  const allTasks = useMemo(() => {
    return [
      ...(todo?.data || []),
      ...(progress?.data || []),
      ...(done?.data || []),
    ];
  }, [todo?.data, progress?.data, done?.data]);

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
    <div className="max-w-7xl mx-auto py-4">
      <DndProvider allTasks={allTasks}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <CardTasks
            title="To Do"
            onSelect={setSelectedTask}
            tasks={todo.data || []}
            status="to-do"
          />
          <CardTasks
            title="In Progress"
            tasks={progress.data || []}
            status="in-progress"
            onSelect={setSelectedTask}
          />
          <CardTasks
            onSelect={setSelectedTask}
            title="Done"
            tasks={done.data || []}
            status="done"
          />
        </div>
      </DndProvider>
      {selectedTask && (
        <EditTask
          isOpen={!!selectedTask}
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
    </div>
  );
};

export default CardView;
